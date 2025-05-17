
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import PostHeader from '@/components/PostHeader';
import QuestionList from '@/components/QuestionList';
import AnswerForm from '@/components/AnswerForm';
import { Post as PostType, Question } from '@/types/post';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [post, setPost] = useState<PostType | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  useEffect(() => {
    // In a real app, fetch from a database
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    const foundPost = storedPosts.find((p: PostType) => p.id === id);
    
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
    
    updatePost({
      ...post,
      questions: [...post.questions, newQuestion]
    });
    
    toast({
      title: "Question submitted",
      description: "Your anonymous question has been sent to the post creator.",
    });
  };

  const handleAnswerQuestion = (questionId: string, answerContent: string) => {
    if (!post || !answerContent) return;
    
    const updatedQuestions = post.questions.map(question => 
      question.id === questionId ? {
        ...question,
        answered: true,
        answer: {
          content: answerContent,
          timestamp: new Date().toISOString()
        }
      } : question
    );
    
    updatePost({
      ...post,
      questions: updatedQuestions
    });

    setSelectedQuestion(null);
    
    toast({
      title: "Answer published",
      description: "Your answer has been published while keeping the asker anonymous.",
    });
  };

  const updatePost = (updatedPost: PostType) => {
    // Update in localStorage
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    const updatedPosts = storedPosts.map((p: PostType) => 
      p.id === updatedPost.id ? updatedPost : p
    );
    
    localStorage.setItem('anonymous-posts', JSON.stringify(updatedPosts));
    setPost(updatedPost);
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
          <PostHeader 
            title={post.title} 
            description={post.description} 
            onShare={handleSharePost} 
          />
          
          <div className="flex-1 overflow-y-auto p-4">
            <QuestionList 
              questions={post.questions} 
              isOwner={isOwner} 
              onSelectQuestion={setSelectedQuestion}
              onShareAnswer={handleShareAnswer}
            />
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
          <AnswerForm
            question={selectedQuestion}
            onCancel={() => setSelectedQuestion(null)}
            onSubmit={handleAnswerQuestion}
          />
        )}
      </main>
    </div>
  );
};

export default Post;
