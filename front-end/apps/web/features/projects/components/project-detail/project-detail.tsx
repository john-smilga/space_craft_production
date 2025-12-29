'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PageLoader } from '@/components/PageLoader';
import { ErrorState } from '@/components/ErrorState';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminOnly } from '@/components/AdminOnly';
import DetailField from '@/components/DetailField';
import { formatDate } from '@/lib/utils';
import { useProjectQuery, useDeleteProjectMutation } from '../../queries';
import { ProjectPlanogramsCard } from '../project-planograms-card/project-planograms-card';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

// Schema for the project planograms endpoint response
const ProjectPlanogramsResponseSchema = z.object({
  planograms: z.array(schemas.PlanogramList)
});
type PlanogramsResponse = z.infer<typeof ProjectPlanogramsResponseSchema>;

type ProjectDetailProps = {
  projectSlug: string;
}

export function ProjectDetail({ projectSlug }: ProjectDetailProps) {
  const router = useRouter();
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { data: project, isLoading, error } = useProjectQuery(projectSlug);

  const { data: planogramsData } = useQuery({
    queryKey: ['planograms', 'list', 'project', projectSlug],
    queryFn: async (): Promise<PlanogramsResponse> => {
      const response = await api.get(`/projects/${projectSlug}/planograms/`);
      return ProjectPlanogramsResponseSchema.parse(response.data);
    },
    enabled: !!projectSlug,
  });

  const projectPlanograms = planogramsData?.planograms || [];

  const deleteMutation = useDeleteProjectMutation(projectSlug);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      await deleteMutation.mutateAsync();
      router.push('/dashboard/projects');
    } catch {
      // Error handled by mutation
    }
  };

  if (isLoading) {
    return <PageLoader message='Loading project details...' />;
  }

  if (error && !project) {
    return (
      <ErrorState error={error} onBack={() => router.push('/dashboard/projects')} />
    );
  }

  return (
    <>
      <div className='mb-6 flex items-center gap-3'>
        <h1 className='text-3xl font-bold'>{project?.name || 'Project Details'}</h1>
        {project && (
          <Button onClick={() => setShowProjectDetails(!showProjectDetails)} variant='outline' size='sm' className='ml-6'>
            {showProjectDetails ? 'Hide' : 'Show'} Details
          </Button>
        )}
      </div>

      {deleteMutation.isError && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{deleteMutation.error?.message}</AlertDescription>
        </Alert>
      )}

      {project && showProjectDetails && (
        <Card className='mb-6'>
          <CardContent className='p-4'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8'>
              <DetailField
                label='Store'
                value={
                  project.store_slug ? (
                    <Link href={`/dashboard/stores/${project.store_slug}`} className='text-primary hover:underline'>
                      {project.store_name}
                    </Link>
                  ) : (
                    <span className='text-destructive'>Store not found</span>
                  )
                }
              />
              <DetailField label='Store Code' value={project.store_code || 'N/A'} />
              <DetailField label='Created At' value={formatDate(project.created_at)} />
              <DetailField label='Created By' value={project.created_by_username || 'N/A'} />
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
                    disabled={deleteMutation.isPending}
                    variant={deleteConfirm ? 'destructive' : 'outline'}
                    size='sm'
                    className={deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Project'}
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

      {project && <ProjectPlanogramsCard projectSlug={projectSlug} planograms={projectPlanograms} />}
    </>
  );
}

