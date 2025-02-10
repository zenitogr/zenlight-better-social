"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Profile } from '@/types/profile';
import { Pencil } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  onFollow: () => void;
  onFriendRequest: () => void;
}

export function ProfileHeader({ profile, isOwnProfile, onFollow, onFriendRequest }: ProfileHeaderProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Image
          src={profile.avatar_url || '/default-avatar.png'}
          alt={profile.username || ''}
          width={96}
          height={96}
          className="rounded-full"
        />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{profile.full_name || profile.username}</h1>
          <p className="text-muted-foreground">@{profile.username}</p>
        </div>
      </div>

      <div className="flex gap-4">
        {isOwnProfile ? (
          <Button asChild>
            <Link href="/settings">
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Link>
          </Button>
        ) : (
          <>
            <Button onClick={onFollow}>Follow</Button>
            <Button variant="outline" onClick={onFriendRequest}>
              Add Friend
            </Button>
          </>
        )}
      </div>

      <div className="flex gap-6">
        <div>
          <div className="text-2xl font-bold">{profile.followerCount}</div>
          <div className="text-muted-foreground">Followers</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{profile.followingCount}</div>
          <div className="text-muted-foreground">Following</div>
        </div>
        <div>
          <div className="text-2xl font-bold">{profile.friendCount}</div>
          <div className="text-muted-foreground">Friends</div>
        </div>
      </div>

      {profile.bio && <p>{profile.bio}</p>}
    </div>
  );
} 