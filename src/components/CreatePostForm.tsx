
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createPost } from '@/lib/supabase-client';
import { useNavigate } from 'react-router-dom';

interface CreatePostFormProps {
  onSuccess?: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "You need to be logged in to create a post.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const post = await createPost(title, description, user.id);
      
      toast({
        title: "Post created!",
        description: "Your Anonymous Q&A post has been created. Share it with others!",
      });
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to the post page
      navigate(`/post/${post.id}`);
    } catch (error: any) {
      toast({
        title: "Failed to create post",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
        {isSubmitting ? 'Creating...' : 'Create Anonymous Q&A Post'}
      </Button>
    </form>
  );
};

export default CreatePostForm;
