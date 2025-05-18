
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import CreatePostForm from '@/components/CreatePostForm';
import PostList from '@/components/PostList';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user, loading } = useAuth();

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
              <h2 className="font-medium text-lg">Recent Q&A Posts</h2>
              <Button 
                onClick={() => {
                  if (!user && !loading) {
                    // Redirect to login if not logged in
                    window.location.href = '/login';
                    return;
                  }
                  setIsDialogOpen(true);
                }}
                size="icon"
                className="rounded-full hover:scale-105 transition-transform"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Create new post</span>
              </Button>
            </div>
            
            <PostList />
            
            {!user && !loading && (
              <div className="mt-6 text-center p-4 glass">
                <p className="mb-2">Want to create your own Q&A post?</p>
                <div className="flex gap-2 justify-center">
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm">
                      Register
                    </Button>
                  </Link>
                </div>
              </div>
            )}
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
