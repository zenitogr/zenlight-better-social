import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Heart, 
  Settings,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/friends', icon: Users, label: 'Friends' },
    { href: '/liked', icon: Heart, label: 'Liked Posts' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`
      fixed left-0 top-14 z-30 h-[calc(100vh-3.5rem)] w-64 
      border-r bg-background transition-transform duration-300 
      md:sticky md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="flex-1 space-y-1">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Button
              key={href}
              variant="ghost"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href={href}>
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </Button>
          ))}
        </nav>
        
        <Button variant="ghost" className="justify-start gap-2 text-red-500 hover:text-red-600">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
} 