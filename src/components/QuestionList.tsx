
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share, MessageCircle } from 'lucide-react';
import ChatMessage from './ChatMessage';
import { Question } from '@/types/post';

interface QuestionListProps {
  questions: Question[];
  isOwner: boolean;
  onSelectQuestion: (question: Question) => void;
  onShareAnswer: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ 
  questions, 
  isOwner, 
  onSelectQuestion, 
  onShareAnswer 
}) => {
  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <MessageCircle className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium">No questions yet</h3>
        <p className="text-muted-foreground">
          Share this post to receive anonymous questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question) => (
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
                  onClick={() => onShareAnswer(question)}
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
                onClick={() => onSelectQuestion(question)}
              >
                Answer this question
              </Button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
