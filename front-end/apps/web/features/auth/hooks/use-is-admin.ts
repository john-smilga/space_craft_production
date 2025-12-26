'use client';
import { useAuthStore } from '../store';

export function useIsAdmin(): boolean {
  const user = useAuthStore.use.user();
  return user?.role === 'admin' || false;
}

