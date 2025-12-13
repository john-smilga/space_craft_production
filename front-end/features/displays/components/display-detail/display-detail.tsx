'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDate } from '@/lib/utils';
import { useDisplayQuery, useDeleteDisplayMutation } from '../../queries';

interface DisplayDetailProps {
  displaySlug: string;
}

export function DisplayDetail({ displaySlug }: DisplayDetailProps) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { data, isLoading, error } = useDisplayQuery(displaySlug);
  const display = data?.display || null;

  const deleteMutation = useDeleteDisplayMutation(displaySlug);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      await deleteMutation.mutateAsync();
      router.push('/dashboard/displays');
    } catch {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !display) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Display Details</h1>
        </div>
      </div>

      {display && (
        <>
          <Card className='mb-6'>
            <CardContent className='p-6'>
              <div className='space-y-4'>
                <div className='mb-4'>
                  <label className='text-sm font-medium text-muted-foreground'>Display Name</label>
                  <p className='text-lg text-foreground mt-1'>{display.name}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Type</label>
                  <p className='text-lg capitalize text-foreground'>{display.type_display}</p>
                </div>

                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Dimensions</label>
                  <p className='text-lg text-foreground'>
                    {display.width_in}&quot; × {display.height_in}&quot; × {display.depth_in}&quot;
                  </p>
                </div>

                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Shelf Count</label>
                  <p className='text-lg text-foreground'>{display.shelf_count}</p>
                </div>

                {display.shelf_spacing && (
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Shelf Spacing</label>
                    <p className='text-lg text-foreground'>{display.shelf_spacing}&quot;</p>
                  </div>
                )}

                {display.usage && (
                  <div className='pt-4 border-t border-border'>
                    <label className='text-sm font-medium text-muted-foreground'>Usage</label>
                    <p className='text-lg text-foreground'>
                      Used in {display.usage.pog_count} planogram{display.usage.pog_count !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                <div>
                  <label className='text-sm font-medium text-muted-foreground'>Created At</label>
                  <p className='text-lg text-foreground'>{formatDate(display.created_at)}</p>
                </div>

                {display.created_by && (
                  <div>
                    <label className='text-sm font-medium text-muted-foreground'>Created By</label>
                    <p className='text-lg text-foreground'>{display.created_by.username}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className='flex gap-3 justify-end'>
            {display.usage && display.usage.pog_count > 0 ? (
              <p className='text-sm text-muted-foreground self-center'>Cannot delete display that is used in planograms</p>
            ) : (
              <>
                <Button onClick={handleDelete} disabled={deleteMutation.isPending} variant={deleteConfirm ? 'destructive' : 'outline'} className={deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'}>
                  {deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Display'}
                </Button>
                {deleteConfirm && (
                  <Button onClick={() => setDeleteConfirm(false)} variant='outline'>
                    Cancel
                  </Button>
                )}
              </>
            )}
          </div>

          {deleteMutation.isError && (
            <Alert variant='destructive' className='mt-4'>
              <AlertDescription>{deleteMutation.error?.message}</AlertDescription>
            </Alert>
          )}
        </>
      )}
    </>
  );
}

