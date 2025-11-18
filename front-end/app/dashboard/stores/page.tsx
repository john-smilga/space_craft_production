'use client';

import { useFetch } from '@/hooks/useFetch';
import { AdminOnly } from '@/components/AdminOnly';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import type { StoresResponse } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import StoreCard from './components/StoreCard';

export default function StoresPage() {
  const { data, loading, error } = useFetch<StoresResponse>('/stores/');
  const stores = data?.stores || [];

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Stores</h1>
          <p className='text-muted-foreground'>Manage your stores</p>
        </div>
        <AdminOnly>
          <Button asChild>
            <Link href='/dashboard/stores/new'>+ Create Store</Link>
          </Button>
        </AdminOnly>
      </div>

      {stores.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              name={store.name}
              store_code={store.store_code}
              slug={store.slug}
              address={store.address}
            />
          ))}
        </div>
      ) : (
        <EmptyState message='No stores available' />
      )}
    </>
  );
}
