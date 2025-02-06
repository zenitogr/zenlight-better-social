import { useEffect, useState } from 'react';
import type { Post } from '@/types/post';
import { createClient } from '@/lib/supabase/client';

export function usePosts(type: 'global' | 'personalized' = 'global') {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();

  const fetchPosts = async () => {
    try {
      const query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (type === 'personalized') {
        // Add personalization logic here
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string) => {
    try {
      const { error: createError } = await supabase
        .from('posts')
        .insert([{ content }]);

      if (createError) throw createError;
      // Refetch posts after creating a new one
      await fetchPosts();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [type]);

  const likePost = async () => {
    // TODO: Implement like functionality
  };

  const commentOnPost = async () => {
    // TODO: Implement comment functionality
  };

  return {
    posts,
    loading,
    error,
    createPost,
    likePost,
    commentOnPost,
    refetch: fetchPosts,
  };
} 