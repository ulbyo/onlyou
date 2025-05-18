
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/supabase-client';
import Header from '@/components/Header';
import PostList from '@/components/PostList';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const { data: userPosts, isLoading: postsLoading } = useQuery({
    queryKey: ['userPosts', user?.id],
    queryFn: () => getPosts(user?.id || null),
    enabled: !!user,
  });

  if (loading || !user) {
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
      
      <main className="flex-1 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-3">Your Profile</h1>
            <div className="flex items-center gap-2 mb-4">
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-6 mb-6">
            <h2 className="font-medium text-lg mb-4">Your Q&A Posts</h2>
            
            {postsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              userPosts && userPosts.length > 0 ? (
                <PostList posts={userPosts} />
              ) : (
                <div className="text-center p-8">
                  <p className="text-muted-foreground">You haven't created any Q&A posts yet.</p>
                  <Button 
                    onClick={() => navigate('/')}
                    className="mt-4"
                  >
                    Create your first post
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
