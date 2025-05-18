
import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

// Utility function to clean up Supabase auth state
export const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

// Component to handle global auth cleanup
const AuthCleanup: React.FC = () => {
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key?.startsWith('supabase.auth.') || e.key?.includes('sb-')) {
        console.log('Auth state changed, syncing...');
      }
    };

    window.addEventListener('storage', handleStorage);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AuthCleanup;
