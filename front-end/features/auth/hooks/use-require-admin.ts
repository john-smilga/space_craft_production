'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useIsAdmin } from './use-is-admin';
import { useAuthStore } from '../store';

export function useRequireAdmin(): void {
  const router = useRouter();
  const isAdmin = useIsAdmin();
  const user = useAuthStore.use.user();

  useEffect(() => {
    if (user && !isAdmin) {
      router.push('/dashboard');
    }
  }, [user, isAdmin, router]);
}

