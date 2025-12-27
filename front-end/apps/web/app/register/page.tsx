import { Suspense } from 'react';
import { RegisterForm } from '@/features/auth';

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}
