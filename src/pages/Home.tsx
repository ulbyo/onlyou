
import React from 'react';
import Header from '@/components/Header';
import CreatePostForm from '@/components/CreatePostForm';
import PostList from '@/components/PostList';

const Home = () => {
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
          
          <div className="glass rounded-xl p-6 mb-6">
            <h2 className="font-medium text-lg mb-4">Create a New Q&A Post</h2>
            <CreatePostForm />
          </div>
          
          <div className="glass rounded-xl p-6">
            <h2 className="font-medium text-lg mb-4">Your Q&A Posts</h2>
            <PostList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
