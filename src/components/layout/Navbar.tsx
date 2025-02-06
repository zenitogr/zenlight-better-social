import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, Bell } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
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
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="/profile/me">
              <div className="relative h-6 w-6 rounded-full bg-muted">
                {/* TODO: Add user avatar */}
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
} 