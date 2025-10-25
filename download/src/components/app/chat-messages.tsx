'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useRef, useEffect } from 'react';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  userAvatarUrl: string;
  userDisplayName: string;
}

const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
}


export function ChatMessages({
  messages,
  isLoading,
  userAvatarUrl,
  userDisplayName
}: ChatMessagesProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);


  return (
    <div ref={scrollAreaRef} className="h-full space-y-6 overflow-y-auto p-4 md:p-6">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={cn(
            'flex items-start gap-4',
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          )}
        >
          {message.sender === 'assistant' && (
            <Avatar className="h-9 w-9">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 text-primary">
                <Bot className="h-5 w-5" />
              </div>
            </Avatar>
          )}

          <div
            className={cn(
              'max-w-md rounded-lg p-3',
              message.sender === 'user'
                ? 'rounded-br-none bg-primary/80 text-primary-foreground'
                : 'rounded-bl-none bg-muted'
            )}
          >
            <div className="prose prose-sm max-w-none text-foreground dark:prose-invert prose-p:my-0">
                <ReactMarkdown>{message.text}</ReactMarkdown>
            </div>
            {message.component && (
              <div className="mt-2">{message.component}</div>
            )}
          </div>

          {message.sender === 'user' && (
            <Avatar className="h-9 w-9">
              <AvatarImage src={userAvatarUrl} alt={userDisplayName} />
              <AvatarFallback>{getInitials(userDisplayName)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="flex items-start gap-4 justify-start">
            <Avatar className="h-9 w-9">
               <div className="flex h-full w-full items-center justify-center rounded-full bg-primary/20 text-primary">
                <Bot className="h-5 w-5" />
              </div>
            </Avatar>
            <div className="max-w-md rounded-lg bg-muted p-3 flex items-center space-x-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.3s]"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50 [animation-delay:-0.15s]"></span>
                <span className="h-2 w-2 animate-pulse rounded-full bg-foreground/50"></span>
            </div>
        </div>
      )}
    </div>
  );
}
