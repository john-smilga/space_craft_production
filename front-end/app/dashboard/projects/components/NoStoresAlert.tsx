'use client';

import { useIsAdmin } from '@/hooks/useIsAdmin';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function NoStoresAlert() {
  const isAdmin = useIsAdmin();
  return (
    <Alert className='mb-6'>
      <AlertDescription className='mb-2'>You need at least one store to create a project.</AlertDescription>
      {isAdmin ? (
        <Link href='/dashboard/stores/new' className='text-primary underline font-medium'>
          Create Store
        </Link>
      ) : (
        <p className='text-sm'>Please contact an administrator to create a store.</p>
      )}
    </Alert>
  );
}

