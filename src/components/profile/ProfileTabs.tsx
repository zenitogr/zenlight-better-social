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
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="posts" className="flex-1">
          Posts ({posts.length})
        </TabsTrigger>
        <TabsTrigger value="comments" className="flex-1">
          Comments ({comments.length})
        </TabsTrigger>
        <TabsTrigger value="likes" className="flex-1">
          Likes ({likes.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6 space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No posts yet
          </p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => {}}
              onComment={() => {}}
              onShare={() => {}}
            />
          ))
        )}
      </TabsContent>

      <TabsContent value="comments" className="mt-6">
        <p className="text-center text-muted-foreground py-8">
          Comments coming soon...
        </p>
      </TabsContent>

      <TabsContent value="likes" className="mt-6">
        <p className="text-center text-muted-foreground py-8">
          Likes coming soon...
        </p>
      </TabsContent>
    </Tabs>
  );
} 