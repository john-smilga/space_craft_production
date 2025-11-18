'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

/**
 * Hook that redirects non-admin users to dashboard
 * Returns true if user is admin, false otherwise
 */
export function useRequireAdmin(): boolean {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [user, router]);

  return user?.role === 'admin' || false;
}

