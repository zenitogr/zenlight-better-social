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
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  // Format the date safely
  const formattedDate = post.created_at ? 
    formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 
    'recently';

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/profile/${post.user_id}`}>
          <div className="relative h-10 w-10">
            <Image
              src="/default-avatar.png"
              alt="Author"
              fill
              className="rounded-full object-cover"
            />
          </div>
        </Link>
        <div>
          <Link 
            href={`/profile/${post.user_id}`}
            className="font-semibold hover:underline"
          >
            {post.user_id}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4">{post.content}</p>

      {/* Media */}
      {post.media && post.media.length > 0 && (
        <div className="mb-4">
          {/* TODO: Add media display */}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" onClick={onLike}>
          <Heart className="h-5 w-5 mr-1" />
          {post.likes_count}
        </Button>
        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="h-5 w-5 mr-1" />
          0
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-5 w-5 mr-1" />
          0
        </Button>
      </div>
    </div>
  );
} 