"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/context/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, loading, user } = useAuth();

  console.log('🔵 Login page rendered:', { loading, user: user?.email });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔵 Login form submitted');
    setIsLoading(true);
    try {
      console.log('🔵 Calling signIn...');
      await signIn(email, password);
      console.log('🟢 SignIn completed successfully');
    } catch (err) {
      console.error('🔴 Login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid email or password');
      setIsLoading(false);
    }
  };

  if (loading) {
    console.log('🟡 Login page showing loading state');
    return <div>Loading...</div>;
  }

  console.log('🔵 Login page rendering form');
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
} 