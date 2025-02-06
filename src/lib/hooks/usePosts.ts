import { useEffect, useState } from 'react';
import type { Post } from '@/types/post';

export function usePosts(type: 'global' | 'personalized' = 'global') {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // TODO: Implement fetch from Supabase
    // For now, just simulate loading
    setLoading(false);
  }, [type]);

  const createPost = async (content: string, media?: File[]) => {
    // TODO: Implement post creation
  };

  const likePost = async (postId: string) => {
    // TODO: Implement like functionality
  };

  const sharePost = async (postId: string) => {
    // TODO: Implement share functionality
  };

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    sharePost,
  };
} 