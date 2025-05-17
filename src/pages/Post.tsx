
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import ChatMessage from '@/components/ChatMessage';
import { Button } from '@/components/ui/button';
import { Share, MessageCircle } from 'lucide-react';

interface Question {
  id: string;
  content: string;
  timestamp: string;
  answered: boolean;
  answer?: {
    content: string;
    timestamp: string;
  };
}

interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions: Question[];
}

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<Post | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState('');

  useEffect(() => {
    // In a real app, fetch from a database
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    const foundPost = storedPosts.find((p: Post) => p.id === id);
    
    if (foundPost) {
      setPost(foundPost);
      
      // For demo, let's consider the creator is the current user
      // In a real app, you'd check auth status
      setIsOwner(true);
    } else {
      navigate('/not-found');
    }
  }, [id, navigate]);

  const handleAskQuestion = (content: string) => {
    if (!post) return;
    
    const newQuestion: Question = {
      id: `q-${Math.random().toString(36).substring(2, 10)}`,
      content,
      timestamp: new Date().toISOString(),
      answered: false
    };
    
    // Update post with new question
    const updatedPost = {
      ...post,
      questions: [...post.questions, newQuestion]
    };
    
    // Update in localStorage
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    const updatedPosts = storedPosts.map((p: Post) => 
      p.id === post.id ? updatedPost : p
    );
    
    localStorage.setItem('anonymous-posts', JSON.stringify(updatedPosts));
    setPost(updatedPost);
    
    toast({
      title: "Question submitted",
      description: "Your anonymous question has been sent to the post creator.",
    });
  };

  const handleAnswerQuestion = (questionId: string) => {
    if (!post || !answerText) return;
    
    const updatedQuestions = post.questions.map(question => 
      question.id === questionId ? {
        ...question,
        answered: true,
        answer: {
          content: answerText,
          timestamp: new Date().toISOString()
        }
      } : question
    );
    
    // Update post with answered question
    const updatedPost = {
      ...post,
      questions: updatedQuestions
    };
    
    // Update in localStorage
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    const updatedPosts = storedPosts.map((p: Post) => 
      p.id === post.id ? updatedPost : p
    );
    
    localStorage.setItem('anonymous-posts', JSON.stringify(updatedPosts));
    setPost(updatedPost);
    setSelectedQuestion(null);
    setAnswerText('');
    
    toast({
      title: "Answer published",
      description: "Your answer has been published while keeping the asker anonymous.",
    });
  };

  const handleSharePost = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Share this link for others to ask you anonymous questions.",
    });
  };

  const handleShareAnswer = (question: Question) => {
    if (!question.answer) return;
    
    const shareText = `Q: ${question.content}\nA: ${question.answer.content}\n\nAsk me anything anonymously: ${window.location.href}`;
    
    navigator.clipboard.writeText(shareText);
    toast({
      title: "Answer copied",
      description: "Share this Q&A on your social media while keeping the asker anonymous.",
    });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />
      
      <main className="flex flex-col md:flex-row flex-1 p-4 gap-4">
        {/* Main Content */}
        <div className="flex-1 flex flex-col h-[calc(100vh-8rem)] glass rounded-xl overflow-hidden">
          <div className="p-4 border-b border-black/10 flex justify-between items-center">
            <div>
              <h2 className="font-medium">{post.title}</h2>
              {post.description && (
                <p className="text-sm text-muted-foreground mt-1">{post.description}</p>
              )}
            </div>
            <Button size="sm" variant="outline" onClick={handleSharePost}>
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {post.questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <MessageCircle className="w-12 h-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">No questions yet</h3>
                <p className="text-muted-foreground">
                  Share this post to receive anonymous questions.
                </p>
              </div>
            ) : (
              post.questions.map((question) => (
                <div key={question.id} className="space-y-2 fade-in">
                  <ChatMessage
                    content={question.content}
                    isQuestion={true}
                    timestamp={new Date(question.timestamp)}
                    id={question.id}
                  />
                  
                  {question.answered && question.answer ? (
                    <div className="flex flex-col items-end">
                      <ChatMessage
                        content={question.answer.content}
                        isQuestion={false}
                        timestamp={new Date(question.answer.timestamp)}
                        id="owner"
                      />
                      {isOwner && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleShareAnswer(question)}
                          className="mt-1"
                        >
                          <Share className="w-3 h-3 mr-1" />
                          Share Answer
                        </Button>
                      )}
                    </div>
                  ) : isOwner ? (
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedQuestion(question)}
                      >
                        Answer this question
                      </Button>
                    </div>
                  ) : null}
                </div>
              ))
            )}
          </div>
          
          {!isOwner && (
            <ChatInput 
              onSendMessage={handleAskQuestion}
              className="border-t border-black/10"
            />
          )}
        </div>
        
        {/* Answer Form */}
        {isOwner && selectedQuestion && (
          <div className="w-full md:w-72 lg:w-96 glass rounded-xl p-4 self-start">
            <h3 className="font-medium mb-2">Answer Question</h3>
            <p className="text-sm mb-3">{selectedQuestion.content}</p>
            <Textarea
              value={answerText}
              onChange={(e) => setAnswerText(e.target.value)}
              placeholder="Type your answer..."
              rows={5}
              className="mb-3"
            />
            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedQuestion(null);
                  setAnswerText('');
                }}
              >
                Cancel
              </Button>
              <Button 
                size="sm"
                disabled={!answerText.trim()} 
                onClick={() => handleAnswerQuestion(selectedQuestion.id)}
              >
                Publish Answer
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Post;
