'use client';

import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminOnly } from '@/components/AdminOnly';
import { useProjectsQuery } from '../../queries';
import { useStoresQuery } from '@/features/stores';
import { ProjectCard } from '../project-card/project-card';

export function ProjectList() {
  const { data, isLoading, error } = useProjectsQuery();
  const projects = data || [];

  const { data: storesData } = useStoresQuery();
  const stores = storesData || [];
  const hasStores = stores.length > 0;

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
          <h1 className='text-3xl font-bold mb-2'>Projects</h1>
          <p className='text-muted-foreground'>Manage your projects</p>
        </div>
        {hasStores && (
          <Button asChild>
            <Link href='/dashboard/projects/new'>+ Create Project</Link>
          </Button>
        )}
      </div>

      {!hasStores && (
        <AdminOnly>
          <Alert className='mb-6'>
            <AlertDescription className='flex items-center gap-2'>
              <span>💡</span>
              <span>
                <strong>Note:</strong> To create a project, navigate to the{' '}
                <Link href='/dashboard/stores' className='text-primary hover:underline'>
                  stores
                </Link>{' '}
                page and create the{' '}
                <Link href='/dashboard/stores/new' className='text-primary hover:underline'>
                  store
                </Link>{' '}
                first.
              </span>
            </AlertDescription>
          </Alert>
        </AdminOnly>
      )}

      {projects.length > 0 ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <EmptyState message='No projects yet' />
      )}
    </>
  );
}

