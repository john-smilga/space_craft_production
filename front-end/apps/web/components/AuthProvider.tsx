'use client';

import { useCurrentUserQuery } from '@/features/auth';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  useCurrentUserQuery();

  return <>{children}</>;
}
