'use client';

import Link from 'next/link';
import UserMenu from '@/components/UserMenu';
import ThemeToggle from '@/components/ThemeToggle';
import { navigationItems } from '@/lib/navigation';

export default function Navbar() {
  return (
    <nav className='bg-white dark:bg-card border-b border-gray-200 dark:border-border px-6 py-4'>
      <div className='max-w-7xl mx-auto flex items-center'>
        <Link href='/dashboard' className='text-2xl font-bold text-gray-900 dark:text-foreground'>
          SpaceCraft
        </Link>
        {/* Navigation links - only visible on medium screens and up, centered */}
        <div className='hidden md:flex items-center gap-8 flex-1 justify-center'>
          {navigationItems.map((item) => (
            <Link key={item.href} href={item.href} className='text-sm font-medium text-foreground hover:text-primary transition-colors'>
              {item.title}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-3 ml-auto'>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </nav>
  );
}
