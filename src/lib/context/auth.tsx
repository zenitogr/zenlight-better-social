"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import type { Profile } from '@/types/profile';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const debug = {
  log: (message: string, ...data: unknown[]) => {
    console.log('[Auth Debug]', message, ...data);
    const logs = JSON.parse(sessionStorage.getItem('auth_logs') || '[]');
    logs.push({ type: 'log', timestamp: new Date().toISOString(), message, data });
    sessionStorage.setItem('auth_logs', JSON.stringify(logs));
  },
  error: (message: string, ...data: unknown[]) => {
    console.error('[Auth Error]', message, ...data);
    const logs = JSON.parse(sessionStorage.getItem('auth_logs') || '[]');
    logs.push({ type: 'error', timestamp: new Date().toISOString(), message, data });
    sessionStorage.setItem('auth_logs', JSON.stringify(logs));
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
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

  // Wrap fetchProfile in useCallback
  const fetchProfile = useCallback(async () => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      debug.error('Error fetching profile:', error);
    }
  }, [user?.id, supabase]);

  // Initial auth check
  useEffect(() => {
    const initializeAuth = async () => {
      console.log('🔵 Initializing auth on path:', typeof window !== 'undefined' ? window.location.pathname : 'server');
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log('🔵 Got session:', session?.user?.email);
        
        if (session?.user) {
          console.log('🟢 Found existing session, user:', session.user.email);
          setUser(session.user);
          await fetchProfile();
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
        if (session?.user) {
          await fetchProfile();
        }
      }
    );

    initializeAuth();
    return () => subscription.unsubscribe();
  }, [supabase.auth, fetchProfile]);

  // Profile sync effect
  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    } else {
      setProfile(null);
    }
  }, [user?.id, fetchProfile]);

  // Auth state change handler
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event, 'User:', session?.user?.email);
        
        if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          router.push('/login');
        } else if (session?.user) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth, router]);

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
      router.push('/');
      
    } catch (error) {
      console.error('🔴 Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string, fullName: string) => {
    try {
      const { error: signUpError, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase(),
            full_name: fullName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        setUser(data.user);
        // The profile will be created automatically via the database trigger
      }
    } catch (error) {
      debug.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      console.log('🟢 Sign out successful, redirecting to login');
      router.push('/login');
    } catch (error) {
      console.error('🔴 Sign out error:', error);
      throw error;
    }
  };

  console.log('AuthProvider rendering with user:', user?.email); // Track final render state
  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 