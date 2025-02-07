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

  const author = post.profiles;

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      {/* Author Info */}
      <div className="flex items-center gap-3 mb-4">
        <Link href={`/profile/${author.username}`}>
          <div className="relative h-10 w-10">
            <Image
              src={author.avatar_url || "/default-avatar.png"}
              alt={author.full_name || author.username}
              fill
              className="rounded-full object-cover"
            />
          </div>
        </Link>
        <div>
          <Link 
            href={`/profile/${author.username}`}
            className="font-semibold hover:underline"
          >
            {author.full_name || author.username}
          </Link>
          <p className="text-sm text-muted-foreground">
            {formattedDate}
          </p>
        </div>
      </div>

      {/* Content */}
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="ghost" size="sm" onClick={onLike}>
          <Heart className="h-5 w-5 mr-1" />
          {post.likes_count || 0}
        </Button>
        <Button variant="ghost" size="sm" onClick={onComment}>
          <MessageCircle className="h-5 w-5 mr-1" />
          {post.comments_count || 0}
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare}>
          <Share2 className="h-5 w-5 mr-1" />
          {post.shares_count || 0}
        </Button>
      </div>
    </div>
  );
} 