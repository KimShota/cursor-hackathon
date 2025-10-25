'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Loader2 } from 'lucide-react';
import { KeyboardEvent } from 'react';

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export function ChatInput({
  input,
  onInputChange,
  onSend,
  isLoading,
}: ChatInputProps) {
  
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (!isLoading) {
        onSend();
      }
    }
  };

  return (
    <div className="relative">
      <Textarea
        placeholder="Ask me anything about your health, schedule, or tasks..."
        className="min-h-[48px] resize-none rounded-2xl pr-20"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        className="absolute right-3 top-1/2 -translate-y-1/2"
        onClick={onSend}
        disabled={isLoading || !input.trim()}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
}
