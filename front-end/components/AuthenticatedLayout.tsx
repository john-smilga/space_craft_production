'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import Navbar from '@/components/Navbar';
import Breadcrumbs from '@/components/Breadcrumbs';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, fetchUser } = useAuthStore();
  const router = useRouter();
  const [hasRefetched, setHasRefetched] = useState(false);

  useEffect(() => {
    if (!loading && !user && !hasRefetched) {
      // Refetch user once if not loaded
      setHasRefetched(true);
      fetchUser();
    } else if (!loading && !user && hasRefetched) {
      // If still no user after refetch, redirect to login
      router.push('/login');
    }
  }, [user, loading, fetchUser, hasRefetched, router]);

  // Show loading while fetching or refetching
  if (loading || (!user && !hasRefetched)) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-background'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

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
