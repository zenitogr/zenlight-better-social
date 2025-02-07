"use client";

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Profile } from '@/types/profile';
import { Post } from '@/types/post';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

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
        .select('*')
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

  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-6 px-4">
        <Skeleton className="h-48 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return notFound();
  }

  return (
    <main className="container max-w-4xl mx-auto py-6 px-4">
      <ProfileHeader profile={profile} />
      <div className="mt-6">
        <ProfileTabs 
          posts={posts}
          comments={[]} // We'll implement comments later
          likes={[]}    // We'll implement likes later
        />
      </div>
    </main>
  );
} 