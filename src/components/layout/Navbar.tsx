"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Bell } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export function Navbar({ onMenuClick, isSidebarOpen }: NavbarProps) {
  const { user, profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 md:h-20 items-center">
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden -ml-2 h-14 w-14 p-3"
          onClick={onMenuClick}
        >
          {isSidebarOpen ? (
            <X className="h-8 w-8" />
          ) : (
            <Menu className="h-8 w-8" />
          )}
        </Button>
        
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/" className="flex items-center gap-3 md:gap-4">
            <Logo className="h-8 w-8 md:h-10 md:w-10" />
            <span className="hidden font-bold text-lg md:text-xl md:inline-block">ZenLight</span>
          </Link>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2 md:gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="lg" className="hidden md:flex">
                <Bell className="h-5 w-5 md:h-6 md:w-6" />
              </Button>
              <div className="flex items-center gap-3 md:gap-4">
                <Button variant="ghost" size="lg" asChild>
                  <Link 
                    href={`/profile/${profile?.username || ''}`}
                    title={profile?.full_name || ''}
                  >
                    <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full bg-muted">
                      {/* TODO: Add user avatar */}
                    </div>
                    <span className="ml-2 hidden md:inline">
                      {profile?.full_name || profile?.username || 'Guest'}'s Profile
                    </span>
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
} 