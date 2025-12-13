'use client';

import { useAuthStore } from '@/features/auth';

interface AdminOnlyProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminOnly({ fallback = null, children }: AdminOnlyProps) {
  const user = useAuthStore.use.user();

  if (user?.role !== 'admin') {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
