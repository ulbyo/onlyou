
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ChatMessage, { ChatMessageProps } from '@/components/ChatMessage';
import QuestionCard from '@/components/QuestionCard';
import ChatInput from '@/components/ChatInput';

// For demo, we'll use some sample data
const sampleQuestions = [
  {
    id: 'q1',
    content: "How does the anonymous identity system work?",
    votes: 5,
    answered: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 'q2',
    content: "Can other users see my IP address?",
    votes: 3,
    answered: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 45)
  },
  {
    id: 'q3',
    content: "Is there a way to create persistent anonymous identities?",
    votes: 8,
    answered: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60)
  }
];

// Initial chat sample
const initialChat: ChatMessageProps[] = [
  {
    id: 'q1',
    content: "How does the anonymous identity system work?",
    isQuestion: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 15)
  },
  {
    id: 'a1',
    content: "Users are assigned a random identifier for each session. This identifier is not connected to any personal information and is forgotten when you close the app.",
    isQuestion: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 14)
  }
];

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialChat);
  const [questions] = useState(sampleQuestions);
  const { toast } = useToast();

  // Generate a random session ID for this user
  const [sessionId] = useState(`user-${Math.random().toString(36).substring(2, 10)}`);

  const handleSendMessage = (content: string) => {
    // Create new question message
    const newQuestion: ChatMessageProps = {
      id: sessionId,
      content,
      isQuestion: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newQuestion]);
    
    // Simulate response after delay
    setTimeout(() => {
      const responseMessage: ChatMessageProps = {
        id: 'responder',
        content: "Thank you for your question. Someone will answer it soon.",
        isQuestion: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);

    toast({
      title: "Question sent",
      description: "Your anonymous question has been submitted",
    });
  };

  const handleSelectQuestion = (question: any) => {
    // Filter to see if this question is already in the chat
    if (!messages.some(m => m.content === question.content)) {
      const newMessages = [
        ...messages,
        {
          id: question.id,
          content: question.content,
          isQuestion: true,
          timestamp: question.timestamp
        },
        {
          id: 'responder',
          content: question.answered 
            ? "This is an example answer to your question. In a real app, this would be answered by a moderator or community member." 
            : "This question hasn't been answered yet. Check back soon!",
          isQuestion: false,
          timestamp: new Date(question.timestamp.getTime() + 1000 * 60)
        }
      ];
      
      setMessages(newMessages);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />
      
      <main className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-black/10">
            <h2 className="font-medium">Anonymous Chat</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <ChatMessage 
                key={`${message.id}-${index}`}
                {...message}
              />
            ))}
          </div>
          
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
        
        {/* Questions Section */}
        <div className="w-full md:w-64 lg:w-80 space-y-4">
          <div className="glass rounded-xl p-4">
            <h2 className="font-medium mb-3">Popular Questions</h2>
            
            <div className="space-y-3">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question.content}
                  votes={question.votes}
                  answered={question.answered}
                  onSelect={() => handleSelectQuestion(question)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
