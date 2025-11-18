'use client';

import { useFetch } from '@/hooks/useFetch';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import type { DisplaysResponse } from '@/types/displays';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function DisplaysPage() {
  const { data, loading, error } = useFetch<DisplaysResponse>('/displays/');
  const displays = data?.displays || [];

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
            <Link key={display.id} href={`/dashboard/displays/${display.slug}`} className='block'>
              <Card className='p-6 transition-all hover:border-primary hover:shadow-md'>
                <CardContent className='p-0'>
                  <div className='mb-2'>
                    <h3 className='text-xl font-semibold'>{display.name}</h3>
                  </div>
                  <p className='text-sm text-muted-foreground capitalize mb-2'>{display.type_display}</p>
                  <p className='text-sm'>
                    {display.width_in}" × {display.height_in}" × {display.depth_in}" | {display.shelf_count} shelf{display.shelf_count !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message='No displays yet' />
      )}
    </>
  );
}
