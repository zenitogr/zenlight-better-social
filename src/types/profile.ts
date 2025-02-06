export type Profile = {
  id: string;
  username: string;
  avatarUrl?: string;
  friendCount: number;
  followerCount: number;
  followingCount: number;
  isFollowing?: boolean;
  isFriend?: boolean;
  friendRequestStatus?: 'none' | 'pending' | 'received';
}; 