'use client';

import Link from 'next/link';
import { AdminOnly } from '@/components/AdminOnly';
import EmptyState from '@/components/EmptyState';
import { PageLoader } from '@/components/PageLoader';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';
import { useStoresQuery } from '../../queries';
import { StoreCard } from '../store-card/store-card';

export function StoreList() {
  const { data, isLoading, error } = useStoresQuery();
  const stores = data || [];

  if (isLoading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorState error={error} />;
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
            />
          ))}
        </div>
      ) : (
        <EmptyState message='No stores available' />
      )}
    </>
  );
}

