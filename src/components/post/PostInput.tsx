"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon } from 'lucide-react';
import { useAuth } from '@/lib/context/auth';

interface PostInputProps {
  onSubmit: (content: string) => Promise<void>;
}

export function PostInput({ onSubmit }: PostInputProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!content.trim() || !user) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Failed to create post:', error);
      // You might want to add error handling/toast here
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Don't show input if user is not logged in
  }

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] mb-3 resize-none"
        maxLength={500} // Match database constraint
      />
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          disabled={true} // Disable for now since we're only handling text
          title="Image upload coming soon"
        >
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {content.length}/500
          </span>
          <Button 
            onClick={handleSubmit} 
            disabled={!content.trim() || isSubmitting}
          >
            {isSubmitting ? 'Posting...' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
} 