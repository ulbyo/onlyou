
import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

type AnonymousAvatarProps = {
  seed: string;
  className?: string;
};

const AnonymousAvatar: React.FC<AnonymousAvatarProps> = ({ seed, className }) => {
  // Generate a deterministic color based on the seed
  const generateColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    // Using a grayscale palette for our black and white theme
    return `hsl(${hue}, 10%, 30%)`;
  };

  const bgColor = generateColor(seed);

  return (
    <div 
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center glass-dark hover-lift",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      <User className="w-4 h-4 text-white" />
    </div>
  );
};

export default AnonymousAvatar;
