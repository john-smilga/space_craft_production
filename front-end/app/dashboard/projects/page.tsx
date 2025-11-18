'use client';

import { useFetch } from '@/hooks/useFetch';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import type { ProjectsResponse } from '@/types/projects';
import type { StoresResponse } from '@/types/stores';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AdminOnly } from '@/components/AdminOnly';

export default function ProjectsPage() {
  const { data, loading, error } = useFetch<ProjectsResponse>('/projects/');
  const projects = data?.projects || [];

  // Fetch stores to check if we can create projects
  const { data: storesData } = useFetch<StoresResponse>('/stores/');
  const stores = storesData?.stores || [];
  const hasStores = stores.length > 0;

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
            <Link key={project.id} href={`/dashboard/projects/${project.slug}`} className='block'>
              <Card className='p-6 hover:border-primary hover:shadow-md transition-all'>
                <CardContent className='p-0'>
                  <h3 className='text-xl font-semibold mb-1'>{project.name}</h3>
                  {project.store ? (
                    <>
                      <p className='text-sm text-muted-foreground mb-2'>{project.store.name}</p>
                      <p className='text-sm text-foreground'>{project.store.store_code}</p>
                    </>
                  ) : (
                    <p className='text-sm text-destructive mb-2'>Store not found</p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState message='No projects yet' />
      )}
    </>
  );
}
