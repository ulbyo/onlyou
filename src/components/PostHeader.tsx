
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share } from 'lucide-react';

interface PostHeaderProps {
  title: string;
  description?: string;
  onShare: () => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, description, onShare }) => {
  return (
    <div className="p-4 border-b border-black/10 flex justify-between items-center">
      <div>
        <h2 className="font-medium">{title}</h2>
        {description && (
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <Button size="sm" variant="outline" onClick={onShare}>
        <Share className="w-4 h-4 mr-2" />
        Share
      </Button>
    </div>
  );
};

export default PostHeader;
