export type PostProfile = {
  username: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type Post = {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  comments_count?: number;
  shares_count?: number;
  created_at: string | null;
  updated_at: string | null;
  profiles: PostProfile;
}; 