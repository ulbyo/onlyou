
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/supabase-client';
import { Loader2 } from 'lucide-react';
import { DbPost } from '@/types/supabase';

interface PostListProps {
  posts?: DbPost[];
  loading?: boolean;
}

const PostList: React.FC<PostListProps> = ({ posts: propPosts, loading: propLoading }) => {
  const { data: fetchedPosts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
    enabled: !propPosts,
  });

  const posts = propPosts || fetchedPosts;
  const loading = propLoading || isLoading;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No Q&A posts found.</p>
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
                {new Date(post.created_at).toLocaleDateString()}
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
