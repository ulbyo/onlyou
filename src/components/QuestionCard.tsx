
import React from 'react';
import { cn } from '@/lib/utils';

export interface QuestionCardProps {
  question: string;
  votes: number;
  answered: boolean;
  onSelect: () => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  votes,
  answered,
  onSelect,
  className,
}) => {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "p-4 rounded-xl glass-dark cursor-pointer float-card",
        "transition-all duration-300 transform hover:scale-105",
        answered ? "opacity-70" : "opacity-100",
        className
      )}
    >
      <h3 className="font-medium text-sm truncate">{question}</h3>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs px-2 py-1 rounded-full bg-white/10">
          {votes} votes
        </span>
        {answered && (
          <span className="text-xs px-2 py-1 rounded-full bg-black text-white">
            Answered
          </span>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
