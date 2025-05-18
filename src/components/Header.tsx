
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="w-full flex items-center justify-between px-4 py-6 glass-dark">
      <Link to="/" className="flex items-center gap-2">
        <MessageCircle className="w-6 h-6" />
        <h1 className="text-xl font-medium">OnlyYou</h1>
      </Link>
      
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Profile</span>
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
