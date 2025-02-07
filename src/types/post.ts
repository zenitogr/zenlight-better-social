export type Post = {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  comments_count?: number;
  shares_count?: number;
  created_at: string | null;
  updated_at: string | null;
  profiles?: {
    username: string;
    full_name: string;
    avatar_url: string | null;
  };
}; 