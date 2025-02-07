"use client";

import { Profile } from '@/types/profile';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onFollow?: () => void;
  onFriendRequest?: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onFollow, onFriendRequest }: ProfileHeaderProps) {
  return (
    <div className="w-full bg-card p-6 rounded-lg shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative h-24 w-24">
          <Image
            src={profile.avatarUrl || '/default-avatar.png'}
            alt={profile.username}
            fill
            className="rounded-full object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          {profile.full_name && (
            <h2 className="text-lg text-muted-foreground mb-2">{profile.full_name}</h2>
          )}
          
          {/* Stats */}
          <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
            <span>{profile.friendCount} friends</span>
            <span>{profile.followerCount} followers</span>
            <span>{profile.followingCount} following</span>
          </div>

          {/* Action Buttons */}
          {!isOwnProfile && (
            <div className="flex gap-2 mt-4">
              <Button 
                variant={profile.isFollowing ? "secondary" : "default"}
                onClick={onFollow}
              >
                {profile.isFollowing ? 'Following' : 'Follow'}
              </Button>
              <Button
                variant="outline"
                onClick={onFriendRequest}
                disabled={profile.friendRequestStatus === 'pending'}
              >
                {profile.isFriend ? 'Friends' : 
                  profile.friendRequestStatus === 'pending' ? 'Request Pending' : 
                  profile.friendRequestStatus === 'received' ? 'Accept Request' : 
                  'Add Friend'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 