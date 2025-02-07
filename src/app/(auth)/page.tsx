"use client";

import { PostInput } from '@/components/post/PostInput';
import { PostCard } from '@/components/post/PostCard';
import type { Post } from '@/types/post';

// Mock data for testing
const mockPosts: Post[] = [
  {
    id: '1',
    content: 'This is a test post! 🚀',
    authorId: 'johndoe',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likeCount: 5,
    commentCount: 2,
    shareCount: 1,
  },
  {
    id: '2',
    content: 'Another test post with some more content to see how it looks! 📝',
    authorId: 'janedoe',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
    likeCount: 10,
    commentCount: 3,
    shareCount: 0,
  },
];

export default function Home() {
  return (
    <main className="container max-w-2xl mx-auto py-6 px-4">
      <PostInput onSubmit={async (content) => {
        console.log('New post:', content);
      }} />
      
      <div className="mt-6 space-y-4">
        {mockPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => console.log('Like:', post.id)}
            onComment={() => console.log('Comment:', post.id)}
            onShare={() => console.log('Share:', post.id)}
          />
        ))}
      </div>
    </main>
  );
}
