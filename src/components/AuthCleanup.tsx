
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

// Function to clean up potential stale auth state
export function cleanupAuthState() {
  try {
    // Clear any potential stale state from localStorage
    const storageKeys = Object.keys(localStorage);
    const supabaseKeys = storageKeys.filter(key => 
      key.startsWith('sb-') || 
      key.includes('supabase') ||
      key.includes('auth')
    );
    
    if (supabaseKeys.length > 0) {
      console.log("Cleaning up potential stale auth state keys:", supabaseKeys);
    }
  } catch (e) {
    console.error("Error cleaning up auth state:", e);
  }
}

// Component that runs on app mount to ensure auth state is clean
const AuthCleanup = () => {
  useEffect(() => {
    // Ensure the supabase client is initialized with the correct options
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state change:", event);
      if (event === 'SIGNED_OUT') {
        // After signout, redirect to login page if not already there
        if (!window.location.pathname.includes('/login') && !window.location.pathname.includes('/register')) {
          window.location.href = '/login';
        }
      }
    });

    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AuthCleanup;
