"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Post } from '@/types/post';

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

      <TabsContent value="posts" className="mt-4">
        {/* TODO: Add PostList component */}
        Posts content
      </TabsContent>

      <TabsContent value="comments" className="mt-4">
        {/* TODO: Add PostList component */}
        Comments content
      </TabsContent>

      <TabsContent value="likes" className="mt-4">
        {/* TODO: Add PostList component */}
        Likes content
      </TabsContent>
    </Tabs>
  );
} 