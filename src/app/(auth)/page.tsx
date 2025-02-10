"use client";

import { PostInput } from '@/components/post/PostInput';
import { PostCard } from '@/components/post/PostCard';
import { usePosts } from '@/lib/hooks/usePosts';
import { useAuth } from '@/lib/context/auth';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const { user } = useAuth();
  const { posts, loading, error, createPost, likePost, likedPosts } = usePosts();

  const handleNewPost = async (content: string) => {
    if (!user) return;
    try {
      await createPost(content);
    } catch (error) {
      console.error('Error creating post:', error);
      // You might want to show an error toast here
    }
  };

  if (loading) {
    return (
      <main className="container max-w-2xl mx-auto py-6 px-4">
        <Skeleton className="h-32 w-full mb-6" />
        <div className="space-y-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container max-w-2xl mx-auto py-6 px-4">
        <div className="text-center text-red-500">
          Error loading posts: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="container max-w-2xl mx-auto py-6 px-4">
      <PostInput onSubmit={handleNewPost} />
      
      <div className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No posts yet. Be the first to post!
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => likePost(post.id)}
              onComment={() => console.log('Comment:', post.id)}
              onShare={() => console.log('Share:', post.id)}
              isLiked={likedPosts.has(post.id)}
            />
          ))
        )}
      </div>
    </main>
  );
}
