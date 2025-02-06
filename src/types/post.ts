export type Post = {
  id: string;
  content: string;
  authorId: string;
  parentId?: string | null; // If it's a comment
  createdAt: string;
  updatedAt: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  media?: {
    type: 'image' | 'video';
    url: string;
  }[];
}; 