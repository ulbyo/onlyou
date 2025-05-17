
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-center py-6 glass-dark">
      <Link to="/" className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h1 className="text-xl font-medium">OnlyYou</h1>
      </Link>
    </header>
  );
};

export default Header;
