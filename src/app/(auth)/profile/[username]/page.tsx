"use client";

import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';

export default function ProfilePage() {
  const params = useParams();
  const username = params.username as string;

  // TODO: Fetch profile data from Supabase
  const mockProfile = {
    id: '1',
    username: username,
    avatarUrl: undefined,
    friendCount: 0,
    followerCount: 0,
    followingCount: 0,
    isFollowing: false,
    isFriend: false,
    friendRequestStatus: 'none' as const,
  };

  // TODO: Check if profile exists
  if (!mockProfile) {
    notFound();
  }

  // TODO: Check if this is the current user's profile
  const isOwnProfile = false;

  return (
    <main className="container max-w-4xl mx-auto py-6 px-4">
      <ProfileHeader 
        profile={mockProfile}
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