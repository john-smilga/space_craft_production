'use client';

import { useRouter } from 'next/navigation';
import { useAuthStore, useCurrentUserQuery } from '@/features/auth';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore.use.user();
  const { isLoading, isError } = useCurrentUserQuery();
  const router = useRouter();

  // If user is in store, show dashboard
  if (user) {
    return (
      <div className='min-h-screen bg-background'>
        <Navbar />
        <main>
          <div className='max-w-7xl mx-auto py-6 px-6 md:px-0'>
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    );
  }

  // If query is loading (fetching user from backend)
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    );
  }

  // If query failed (user not found on backend) or user is null after loading
  if (isError || !user) {
    router.push('/login');
    return null;
  }

  return null;
}
