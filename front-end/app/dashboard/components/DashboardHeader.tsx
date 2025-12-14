'use client';

import { useAuthStore } from '@/features/auth';

export default function DashboardHeader() {
  const user = useAuthStore.use.user();

  return (
    <div className='mb-24 mt-8'>
      <h1 className='text-3xl font-bold'>
        Welcome back - <span className='text-primary'>{user?.username}</span>
      </h1>
    </div>
  );
}
