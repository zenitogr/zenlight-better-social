"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Bell } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="hidden font-bold md:inline-block">ZenLight</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:block">
                  {profile?.full_name}
                </span>
                <Button variant="ghost" size="icon" asChild>
                  <Link 
                    href={`/profile/${profile?.username || ''}`}
                    title={profile?.full_name || ''}
                  >
                    <div className="relative h-6 w-6 rounded-full bg-muted">
                      {/* TODO: Add user avatar */}
                    </div>
                  </Link>
                </Button>
              </div>
              <Button variant="ghost" onClick={handleSignOut}>
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 