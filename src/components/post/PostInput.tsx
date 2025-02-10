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
    if (!content.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(content);
      setContent('');
    } catch (error) {
      console.error('Error submitting post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Don't show input if user is not logged in
  }

  return (
    <div className="border rounded-lg p-4 space-y-4 bg-card">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="icon" disabled={isSubmitting}>
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button 
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting}
        >
          Post
        </Button>
      </div>
    </div>
  );
} 