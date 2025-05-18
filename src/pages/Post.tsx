
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPostById, getQuestionsForPost, createQuestion, createAnswer } from '@/lib/supabase-client';
import Header from '@/components/Header';
import ChatInput from '@/components/ChatInput';
import PostHeader from '@/components/PostHeader';
import QuestionList from '@/components/QuestionList';
import AnswerForm from '@/components/AnswerForm';
import { Loader2 } from 'lucide-react';
import { Question } from '@/types/post';

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);

  const { data: post, isLoading: isPostLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id!),
    onError: () => {
      navigate('/not-found');
    },
    enabled: !!id
  });

  const { data: questions, isLoading: areQuestionsLoading } = useQuery({
    queryKey: ['questions', id],
    queryFn: () => getQuestionsForPost(id!),
    enabled: !!id
  });

  // Determine if current user is the post owner
  const isOwner = user && post ? user.id === post.owner_id : false;

  const askQuestionMutation = useMutation({
    mutationFn: (content: string) => createQuestion(id!, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', id] });
      toast({
        title: "Question submitted",
        description: "Your anonymous question has been sent to the post creator.",
      });
    }
  });

  const answerQuestionMutation = useMutation({
    mutationFn: ({ questionId, answerContent }: { questionId: string, answerContent: string }) => 
      createAnswer(questionId, answerContent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['questions', id] });
      setSelectedQuestion(null);
      toast({
        title: "Answer published",
        description: "Your answer has been published while keeping the asker anonymous.",
      });
    }
  });

  const handleAskQuestion = (content: string) => {
    askQuestionMutation.mutate(content);
  };

  const handleAnswerQuestion = (questionId: string, answerContent: string) => {
    answerQuestionMutation.mutate({ questionId, answerContent });
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

  if (isPostLoading || !post) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fafafa]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

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
            {areQuestionsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <QuestionList 
                questions={questions?.map(q => ({
                  id: q.id,
                  content: q.content,
                  timestamp: q.created_at,
                  answered: q.answered,
                  answer: q.answers && q.answers[0] ? {
                    content: q.answers[0].content,
                    timestamp: q.answers[0].created_at
                  } : undefined
                }))} 
                isOwner={isOwner} 
                onSelectQuestion={setSelectedQuestion}
                onShareAnswer={handleShareAnswer}
              />
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
