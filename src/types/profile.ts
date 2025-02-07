export type FriendRequestStatus = 'none' | 'pending' | 'received' | 'accepted';

export type Profile = {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  // Social stats
  friendCount: number;
  followerCount: number;
  followingCount: number;
  // Relationship status with current user
  isFollowing: boolean;
  isFriend: boolean;
  friendRequestStatus: FriendRequestStatus;
}; 