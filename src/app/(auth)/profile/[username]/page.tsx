"use client";

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { PostInput } from '@/components/post/PostInput';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Profile } from '@/types/profile';
import { Post } from '@/types/post';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/lib/context/auth';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const isOwnProfile = profile?.id === user?.id;

  useEffect(() => {
    async function fetchProfileAndPosts() {
      const supabase = createClient();
      
      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (profileError || !profileData) {
        notFound();
      }

      // Fetch posts for this user
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', profileData.id)
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Error fetching posts:', postsError);
      }

      setProfile({
        ...profileData,
        friendCount: 0,
        followerCount: 0,
        followingCount: 0,
        isFollowing: false,
        isFriend: false,
        friendRequestStatus: 'none' as const,
        avatarUrl: profileData.avatar_url
      });
      setPosts(postsData || []);
      setLoading(false);
    }

    fetchProfileAndPosts();
  }, [username]);

  const handleNewPost = async (content: string) => {
    if (!user || !profile) return;
    
    try {
      const supabase = createClient();
      const { error: createError } = await supabase
        .from('posts')
        .insert([{ 
          content,
          user_id: user.id,
        }]);

      if (createError) throw createError;

      // Refetch posts
      const { data: newPosts, error: fetchError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .eq('user_id', profile.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setPosts(newPosts || []);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  if (loading) {
    return <Skeleton className="h-full w-full" />;
  }

  if (!profile) {
    return notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto py-6 px-4">
      <ProfileHeader 
        profile={profile}
        isOwnProfile={isOwnProfile}
        onFollow={() => {}}
        onFriendRequest={() => {}}
      />
      
      {/* Show PostInput only on own profile */}
      {isOwnProfile && (
        <div className="mt-6">
          <PostInput onSubmit={handleNewPost} />
        </div>
      )}

      <div className="mt-6">
        <ProfileTabs 
          posts={posts}
          comments={[]}
          likes={[]}
        />
      </div>
    </main>
  );
} 