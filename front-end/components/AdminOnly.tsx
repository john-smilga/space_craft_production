'use client';

import { useAuthStore } from '@/stores/authStore';

interface AdminOnlyProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminOnly({ fallback = null, children }: AdminOnlyProps) {
  const { user } = useAuthStore();

  if (user?.role !== 'admin') {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
