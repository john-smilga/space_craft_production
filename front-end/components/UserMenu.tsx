'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

type MenuItem = {
  label: string;
  href?: string;
  onClick?: () => void;
  adminOnly?: boolean;
};

export default function UserMenu() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (!user) return null;

  const initials = user.username.charAt(0).toUpperCase();

  const menuItems: MenuItem[] = [
    { label: 'Projects', href: '/dashboard/projects' },
    { label: 'Planograms', href: '/dashboard/planograms' },
    { label: 'Stores', href: '/dashboard/stores' },
    { label: 'Displays', href: '/dashboard/displays' },
    { label: 'My Profile', href: '/dashboard/my-profile' },
    { label: 'Users', href: '/dashboard/users', adminOnly: true },
    { label: 'Invite User', href: '/dashboard/users/invite', adminOnly: true },
    { label: 'Logout', onClick: handleLogout },
  ];

  const visibleMenuItems = menuItems.filter((item) => !item.adminOnly || user.role === 'admin');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default' size='icon' className='w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary/90 cursor-pointer'>
          {initials}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-48'>
        {visibleMenuItems.map((item) => {
          if (item.href) {
            return (
              <DropdownMenuItem key={item.label} asChild>
                <Link href={item.href}>{item.label}</Link>
              </DropdownMenuItem>
            );
          }
          return (
            <DropdownMenuItem key={item.label} onClick={item.onClick}>
              {item.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
