'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@/hooks/useMutation';
import Link from 'next/link';
import type { Project } from '@/types/projects';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminOnly } from '@/components/AdminOnly';
import DetailField from '@/components/DetailField';
import { formatDate } from '@/lib/utils';
import api from '@/lib/axios';

interface ProjectDetailsCardProps {
  project: Project;
  projectSlug: string;
}

export default function ProjectDetailsCard({ project, projectSlug }: ProjectDetailsCardProps) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteMutation = useMutation<void, void>(
    async () => {
      await api.delete(`/projects/${projectSlug}/`);
    },
    { toastResource: 'project' }
  );

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    const result = await deleteMutation.mutate(undefined);
    if (!result.error) {
      router.push('/dashboard/projects');
    }
  };

  return (
    <>
      {deleteMutation.error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{deleteMutation.error}</AlertDescription>
        </Alert>
      )}
      <Card className='mb-6'>
      <CardContent className='p-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8'>
          <DetailField
            label='Store'
            value={
              project.store ? (
                <Link href={`/dashboard/stores/${project.store.slug}`} className='text-primary hover:underline'>
                  {project.store.name}
                </Link>
              ) : (
                <span className='text-destructive'>Store not found</span>
              )
            }
          />
          <DetailField label='Store Code' value={project.store?.store_code || 'N/A'} />
          <DetailField label='Created At' value={formatDate(project.created_at)} />
          <DetailField label='Created By' value={project.created_by?.username || 'N/A'} />
          <div className='md:col-start-1 md:row-start-2'></div>
          <div className='md:col-start-2 md:row-start-2'></div>
          <div className='md:col-start-3 md:row-start-2'></div>
          <AdminOnly>
            <div className='md:col-start-4 md:row-start-2 flex flex-row gap-2'>
              {!deleteConfirm && (
                <Button asChild variant='outline' size='sm' className='bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800'>
                  <Link href={`/dashboard/projects/${projectSlug}/edit`}>Edit Project</Link>
                </Button>
              )}
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.loading}
                variant={deleteConfirm ? 'destructive' : 'outline'}
                size='sm'
                className={deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'}
              >
                {deleteMutation.loading ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Project'}
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
    </>
  );
}

