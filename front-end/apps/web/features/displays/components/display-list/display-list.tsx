'use client';

import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useDisplaysQuery } from '../../queries';
import { DisplayCard } from '../display-card/display-card';

export function DisplayList() {
  const { data, isLoading, error } = useDisplaysQuery();
  const displays = data || [];

  if (isLoading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-3xl font-bold mb-2'>Displays</h1>
          <p className='text-muted-foreground'>Manage your display catalog</p>
        </div>
        <Button asChild>
          <Link href='/dashboard/displays/new'>+ Create Display</Link>
        </Button>
      </div>

      {displays.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {displays.map((display) => (
            <DisplayCard key={display.id} display={display} />
          ))}
        </div>
      ) : (
        <EmptyState message='No displays yet' />
      )}
    </>
  );
}

