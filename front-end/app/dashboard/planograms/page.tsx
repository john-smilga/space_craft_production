'use client';

import { usePlanogramsQuery } from '@/features/planogram';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PlanogramCard from './components/PlanogramCard';

export default function PlanogramsPage() {
  const { data, isLoading, error } = usePlanogramsQuery();
  const planograms = data || [];

  if (isLoading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{(error as Error).message || 'Failed to load planograms'}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Planograms</h1>
        <p className='text-muted-foreground'>View and manage your planograms</p>
      </div>

      <Alert className='mb-6'>
        <AlertDescription className='flex items-center gap-2'>
          <span>💡</span>
          <span>
            <strong>Note:</strong> To create a planogram, navigate to a{' '}
            <Link href='/dashboard/projects' className='text-primary hover:underline'>
              projects
            </Link>{' '}
            page, select a project, then click &quot;Create Planogram&quot;.
          </span>
        </AlertDescription>
      </Alert>

      {planograms.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {planograms.map((planogram) => (
            <PlanogramCard
              key={planogram.id}
              name={planogram.name}
              slug={planogram.slug}
              projectName={planogram.project_name || 'Unknown'}
              projectSlug={planogram.project_slug || ''}
              displayName={planogram.display_name || null}
              seasonDisplay={planogram.season || 'summer'}
              categories={[]}
              categoryIds={[]}
            />
          ))}
        </div>
      ) : (
        <EmptyState message='No planograms yet' />
      )}
    </>
  );
}
