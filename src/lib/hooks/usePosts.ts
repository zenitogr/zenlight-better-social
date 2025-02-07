import { useEffect, useState, useMemo, useCallback } from 'react';
import type { Post } from '@/types/post';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/context/auth';

export function usePosts(type: 'global' | 'personalized' = 'global') {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  
  // Memoize the supabase client
  const supabase = useMemo(() => createClient(), []);

  const fetchPosts = useCallback(async () => {
    try {
      const query = supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (type === 'personalized') {
        // Add personalization logic here later
        // For example, only show posts from followed users
      }

      const { data, error: fetchError } = await query;
      
      if (fetchError) throw fetchError;
      setPosts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'));
    } finally {
      setLoading(false);
    }
  }, [type, supabase]);

  const createPost = async (content: string) => {
    if (!user) throw new Error('Must be logged in to create a post');

    try {
      const { error: createError } = await supabase
        .from('posts')
        .insert([{ 
          content,
          user_id: user.id,
        }]);

      if (createError) throw createError;
      // Refetch posts after creating a new one
      await fetchPosts();
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to create post');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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