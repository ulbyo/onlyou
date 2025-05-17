
import React from 'react';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-center py-6 glass-dark">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h1 className="text-xl font-medium">Anonymous QnA</h1>
      </div>
    </header>
  );
};

export default Header;
