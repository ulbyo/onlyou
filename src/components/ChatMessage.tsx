
import React from 'react';
import { cn } from '@/lib/utils';
import AnonymousAvatar from './AnonymousAvatar';

export interface ChatMessageProps {
  content: string;
  isQuestion: boolean;
  timestamp: Date;
  id: string;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isQuestion,
  timestamp,
  id,
  className,
}) => {
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(timestamp);

  return (
    <div
      className={cn(
        "w-full flex items-start gap-3 p-4 my-2 fade-in",
        isQuestion ? "justify-start" : "justify-end",
        className
      )}
    >
      {isQuestion && <AnonymousAvatar seed={id} />}
      
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 hover-lift",
          isQuestion 
            ? "bg-black text-white rounded-tl-none" 
            : "glass border border-black/10 rounded-tr-none"
        )}
      >
        <p className="text-sm">{content}</p>
        <div className={cn(
          "text-xs mt-1", 
          isQuestion ? "text-gray-300" : "text-gray-500"
        )}>
          {formattedTime}
        </div>
      </div>
      
      {!isQuestion && <AnonymousAvatar seed="responder" />}
    </div>
  );
};

export default ChatMessage;
