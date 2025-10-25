'use client';

import { ChatMessage as ChatMessageType } from '@/lib/types';
import { ChatMessages } from './chat-messages';
import { ChatInput } from './chat-input';

interface ChatLayoutProps {
  messages: ChatMessageType[];
  input: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
  userAvatarUrl: string;
  userDisplayName: string;
}

export function ChatLayout({
  messages,
  input,
  onInputChange,
  onSend,
  isLoading,
  userAvatarUrl,
  userDisplayName,
}: ChatLayoutProps) {
  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex-1 overflow-y-auto">
        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          userAvatarUrl={userAvatarUrl}
          userDisplayName={userDisplayName}
        />
      </div>
      <div className="border-t bg-background px-4 py-3">
        <ChatInput
          input={input}
          onInputChange={onInputChange}
          onSend={onSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
