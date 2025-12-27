'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminOnly } from '@/components/AdminOnly';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DetailField from '@/components/DetailField';
import { formatDate } from '@/lib/utils';
import { useProjectsQuery } from '@/features/projects';
import { useStoreQuery, useDeleteStoreMutation } from '../../queries';

type StoreDetailProps = {
  storeSlug: string;
}

export function StoreDetail({ storeSlug }: StoreDetailProps) {
  const router = useRouter();
  const [showStoreDetails, setShowStoreDetails] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { data: store, isLoading, error } = useStoreQuery(storeSlug);

  const { data: projectsData } = useProjectsQuery();

  const allProjects = projectsData || [];
  const storeProjects = store ? allProjects.filter((p) => p.store_code === store.store_code) : [];

  const deleteMutation = useDeleteStoreMutation(storeSlug);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      await deleteMutation.mutateAsync();
      router.push('/dashboard/stores');
    } catch {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !store) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error.message}</AlertDescription>
        <Button onClick={() => router.push('/dashboard/stores')} variant='outline' className='mt-4'>
          Back to Stores
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-6 flex items-center gap-3'>
        <h1 className='text-3xl font-bold'>{store?.name || 'Store Details'}</h1>
        {store && (
          <Button onClick={() => setShowStoreDetails(!showStoreDetails)} variant='outline' size='sm' className='ml-6'>
            {showStoreDetails ? 'Hide' : 'Show'} Details
          </Button>
        )}
      </div>

      {deleteMutation.isError && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{deleteMutation.error?.message}</AlertDescription>
        </Alert>
      )}

      {store && showStoreDetails && (
        <Card className='mb-6'>
          <CardContent className='p-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8'>
              <DetailField label='Store Code' value={store.store_code} />
              <DetailField label='Address' value={store.address} valueClassName='line-clamp-2' />
              <DetailField label='Created At' value={formatDate(store.created_at)} />
              <DetailField label='Created By' value={store.created_by_username || 'N/A'} />
              <div className='md:col-start-1 md:row-start-2'></div>
              <div className='md:col-start-2 md:row-start-2'></div>
              <div className='md:col-start-3 md:row-start-2'></div>
              <AdminOnly>
                <div className='md:col-start-4 md:row-start-2 flex flex-row gap-2'>
                  {!deleteConfirm && (
                    <Button asChild variant='outline' size='sm' className='bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800'>
                      <Link href={`/dashboard/stores/${storeSlug}/edit`}>Edit Store</Link>
                    </Button>
                  )}
                  <Button onClick={handleDelete} disabled={deleteMutation.isPending} variant={deleteConfirm ? 'destructive' : 'outline'} size='sm' className={deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'}>
                    {deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Store'}
                  </Button>
                  {deleteConfirm && (
                    <Button onClick={() => setDeleteConfirm(false)} variant='outline' size='sm'>
                      Cancel
                    </Button>
                  )}
                </div>
              </AdminOnly>
            </div>
          </CardContent>
        </Card>
      )}

      {store && (
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {storeProjects.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {storeProjects.map((project) => (
                  <Link key={project.id} href={`/dashboard/projects/${project.slug}`} className='block'>
                    <Card className='p-4 hover:border-primary shadow-md transition-all'>
                      <CardContent className='p-0'>
                        <h3 className='text-lg font-semibold'>{project.name}</h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <EmptyState message='This store has no projects yet' />
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}

