"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon } from 'lucide-react';

interface PostInputProps {
  onSubmit: (content: string, media?: File[]) => Promise<void>;
}

export function PostInput({ onSubmit }: PostInputProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!content.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit(content);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card rounded-lg p-4 shadow-sm">
      <Textarea
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px] mb-3"
      />
      <div className="flex justify-between items-center">
        <Button variant="ghost" size="icon">
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