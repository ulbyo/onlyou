
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  className?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  placeholder = "Ask a question anonymously...", 
  className 
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={cn(
        "w-full flex items-center gap-2 p-2",
        className
      )}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-4 py-3 rounded-full glass-dark focus:outline-none focus:ring-1 focus:ring-black text-sm"
      />
      <button
        type="submit"
        className="p-3 rounded-full bg-black text-white hover:bg-gray-800 transition-colors hover-lift"
        disabled={!message.trim()}
      >
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ChatInput;
