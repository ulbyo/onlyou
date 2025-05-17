
import React, { useState } from 'react';
import Header from '@/components/Header';
import CreatePostForm from '@/components/CreatePostForm';
import PostList from '@/components/PostList';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header />
      
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-3">Anonymous Q&A</h1>
            <p className="text-muted-foreground">
              Create a post for others to ask you questions anonymously
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 mb-6 relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium text-lg">Your Q&A Posts</h2>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                size="icon"
                className="rounded-full hover:scale-105 transition-transform"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create new post</span>
              </Button>
            </div>
            
            <PostList />
          </div>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a New Q&A Post</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <CreatePostForm onSuccess={() => setIsDialogOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;
