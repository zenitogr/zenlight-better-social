import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Users, 
  Heart, 
  Settings,
  LogOut
} from 'lucide-react';
import { useAuth } from '@/lib/context/auth';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/friends', icon: Users, label: 'Friends' },
    { href: '/liked', icon: Heart, label: 'Liked Posts' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className={`
      fixed left-0 top-16 md:top-20 z-30 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-72 
      border-r bg-background transition-transform duration-300 
      md:sticky md:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex h-full flex-col gap-3 p-6">
        <nav className="flex-1 space-y-2">
          {navItems.map(({ href, icon: Icon, label }) => (
            <Button
              key={href}
              variant="ghost"
              className="w-full justify-start gap-4 px-4 py-6 text-base"
              asChild
            >
              <Link href={href}>
                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                {label}
              </Link>
            </Button>
          ))}
        </nav>
        
        <Button 
          variant="ghost" 
          className="justify-start gap-4 px-4 py-6 text-base text-red-500 hover:text-red-600"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 md:h-6 md:w-6" />
          Logout
        </Button>
      </div>
    </aside>
  );
} 