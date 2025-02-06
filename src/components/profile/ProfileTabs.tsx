"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Post } from '@/types/post';
import { PostCard } from '@/components/post/PostCard';

interface ProfileTabsProps {
  posts: Post[];
  comments: Post[];
  likes: Post[];
}

export function ProfileTabs({ posts, comments, likes }: ProfileTabsProps) {
  return (
    <Tabs defaultValue="posts" className="w-full mt-6">
      <TabsList className="w-full justify-start">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-4 space-y-4">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => {}}
            onComment={() => {}}
            onShare={() => {}}
          />
        ))}
      </TabsContent>

      <TabsContent value="comments" className="mt-4 space-y-4">
        {comments.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => {}}
            onComment={() => {}}
            onShare={() => {}}
          />
        ))}
      </TabsContent>

      <TabsContent value="likes" className="mt-4 space-y-4">
        {likes.map(post => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => {}}
            onComment={() => {}}
            onShare={() => {}}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
} 