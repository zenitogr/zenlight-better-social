"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a debug function that both logs and stores messages
const debug = {
  log: (...args: any[]) => {
    console.log('[Auth Debug]', ...args);
    // Store in sessionStorage for persistence
    const logs = JSON.parse(sessionStorage.getItem('auth_logs') || '[]');
    logs.push({ type: 'log', timestamp: new Date().toISOString(), message: args });
    sessionStorage.setItem('auth_logs', JSON.stringify(logs));
  },
  error: (...args: any[]) => {
    console.error('[Auth Error]', ...args);
    const logs = JSON.parse(sessionStorage.getItem('auth_logs') || '[]');
    logs.push({ type: 'error', timestamp: new Date().toISOString(), message: args });
    sessionStorage.setItem('auth_logs', JSON.stringify(logs));
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  // Add a new useEffect for client-side logging
  useEffect(() => {
    console.log('🔄 AuthProvider mounted - Current path:', window.location.pathname, 'User:', user?.email);
  }, [user?.email]);

  // Clear logs on mount
  useEffect(() => {
    sessionStorage.setItem('auth_logs', '[]');
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔵 Initializing auth on path:', typeof window !== 'undefined' ? window.location.pathname : 'server');
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔵 Got session:', session?.user?.email);
        
        if (session?.user) {
          console.log('🟢 Found existing session, user:', session.user.email);
          setUser(session.user);
        } else {
          console.log('🟡 No existing session found');
        }
        setLoading(false);
      } catch (error) {
        console.error('🔴 Auth initialization error:', error);
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, 'User:', session?.user?.email, 
          'Path:', typeof window !== 'undefined' ? window.location.pathname : 'server');
        setUser(session?.user ?? null);
      }
    );

    initializeAuth();
    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const signIn = async (email: string, password: string) => {
    console.log('🔵 Starting sign in for:', email);
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('🔴 Sign in error:', error);
        throw error;
      }
      
      console.log('🟢 Sign in successful for:', data.user?.email);
      setUser(data.user);
      
      console.log('🟢 Redirecting to home...');
      window.location.href = '/';
      
    } catch (error) {
      console.error('🔴 Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.replace('/login');
    } catch (error) {
      debug.error('Sign out error:', error);
      throw error;
    }
  };

  console.log('AuthProvider rendering with user:', user?.email); // Track final render state
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 