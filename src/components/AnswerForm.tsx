
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Question } from '@/types/post';

interface AnswerFormProps {
  question: Question;
  onCancel: () => void;
  onSubmit: (questionId: string, answer: string) => void;
}

const AnswerForm: React.FC<AnswerFormProps> = ({ 
  question, 
  onCancel, 
  onSubmit 
}) => {
  const [answerText, setAnswerText] = useState('');

  const handleSubmit = () => {
    if (!answerText.trim()) return;
    onSubmit(question.id, answerText);
    setAnswerText('');
  };

  return (
    <div className="w-full md:w-72 lg:w-96 glass rounded-xl p-4 self-start">
      <h3 className="font-medium mb-2">Answer Question</h3>
      <p className="text-sm mb-3">{question.content}</p>
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          size="sm"
          disabled={!answerText.trim()} 
          onClick={handleSubmit}
        >
          Publish Answer
        </Button>
      </div>
    </div>
  );
};

export default AnswerForm;
