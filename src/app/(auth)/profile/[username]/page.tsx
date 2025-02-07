"use client";

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { Profile } from '@/types/profile';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .single();

      if (error || !data) {
        notFound();
      }

      setProfile({
        ...data,
        friendCount: 0,
        followerCount: 0,
        followingCount: 0,
        isFollowing: false,
        isFriend: false,
        friendRequestStatus: 'none' as const,
        avatarUrl: data.avatar_url
      });
      setLoading(false);
    }

    fetchProfile();
  }, [username]);

  if (loading || !profile) {
    return <div>Loading...</div>; // You could use your loading skeleton here
  }

  // TODO: Check if this is the current user's profile
  const isOwnProfile = false;

  return (
    <main className="container max-w-4xl mx-auto py-6 px-4">
      <ProfileHeader 
        profile={profile}
        isOwnProfile={isOwnProfile}
        onFollow={() => {}}
        onFriendRequest={() => {}}
      />
      <ProfileTabs 
        posts={[]}
        comments={[]}
        likes={[]}
      />
    </main>
  );
} 