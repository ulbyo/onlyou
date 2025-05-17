
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface CreatePostFormProps {
  onSuccess?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would save to a database
    // For now we'll just generate a random ID and store in localStorage
    const postId = `post-${Math.random().toString(36).substring(2, 10)}`;
    
    const newPost = {
      id: postId,
      title,
      description,
      createdAt: new Date().toISOString(),
      questions: []
    };
    
    // Store in localStorage for demo
    const existingPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    localStorage.setItem('anonymous-posts', JSON.stringify([...existingPosts, newPost]));
    
    toast({
      title: "Post created!",
      description: "Your Anonymous Q&A post has been created. Share it with others!",
    });
    
    if (onSuccess) {
      onSuccess();
    }
    
    // Redirect to the post page
    window.location.href = `/post/${postId}`;
    
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Post Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ask me anything about..."
          required
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description (optional)
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add some context to your post..."
          rows={4}
          className="w-full"
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={!title || isSubmitting}
        className="w-full"
      >
        Create Anonymous Q&A Post
      </Button>
    </form>
  );
};

export default CreatePostForm;
