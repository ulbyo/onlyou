
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  questions: any[];
}

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // In a real app, fetch from a database
    const storedPosts = JSON.parse(localStorage.getItem('anonymous-posts') || '[]');
    setPosts(storedPosts);
  }, []);

  if (posts.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">You haven't created any Q&A posts yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Link to={`/post/${post.id}`} key={post.id}>
          <Card className="hover-lift glass-dark transition-all duration-300 cursor-pointer">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {new Date(post.createdAt).toLocaleDateString()} • 
                {post.questions.length} question{post.questions.length !== 1 ? 's' : ''}
              </CardDescription>
            </CardHeader>
            {post.description && (
              <CardContent>
                <p className="line-clamp-2">{post.description}</p>
              </CardContent>
            )}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
