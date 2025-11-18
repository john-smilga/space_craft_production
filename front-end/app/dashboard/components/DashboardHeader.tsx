'use client';

import { useAuthStore } from '@/stores/authStore';

export default function DashboardHeader() {
  const { user } = useAuthStore();

  return (
    <div className='mb-24 mt-8'>
      <h1 className='text-3xl font-bold'>
        Welcome back - <span className='text-primary'>{user?.username}</span>
      </h1>
    </div>
  );
}
