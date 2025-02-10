"use client";

import { Post } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  isLiked?: boolean;
}

export function PostCard({ post, onLike, onComment, onShare, isLiked }: PostCardProps) {
  return (
    <article className="border rounded-lg p-4 space-y-4 bg-card">
      <div className="flex items-center gap-3">
        <Link href={`/profile/${post.profiles.username}`}>
          <Image
            src={post.profiles.avatar_url || '/default-avatar.png'}
            alt={post.profiles.username}
            width={40}
            height={40}
            className="rounded-full"
          />
        </Link>
        <div>
          <Link href={`/profile/${post.profiles.username}`} className="font-medium hover:underline">
            {post.profiles.full_name || post.profiles.username}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at || ''), { addSuffix: true })}
          </p>
        </div>
      </div>

      <p className="text-base">{post.content}</p>

      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 ${isLiked ? 'text-red-500' : ''}`}
          onClick={onLike}
        >
          <Heart className="h-5 w-5" />
          {post.likes_count}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2" onClick={onComment}>
          <MessageCircle className="h-5 w-5" />
          {post.comments_count || 0}
        </Button>
        <Button variant="ghost" size="sm" className="gap-2" onClick={onShare}>
          <Share2 className="h-5 w-5" />
          {post.shares_count || 0}
        </Button>
      </div>
    </article>
  );
} 