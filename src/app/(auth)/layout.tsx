"use client";

import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth(); // This is now safe because useAuth will never return null
  const router = useRouter();

  console.log('🔄 AuthLayout render - Loading:', loading, 'User:', user?.email);

  useEffect(() => {
    if (!loading && !user) {
      console.log('🔴 No user found, redirecting to login');
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return <>{children}</>;
} 