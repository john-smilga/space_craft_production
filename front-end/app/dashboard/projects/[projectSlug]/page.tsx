'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import type { ProjectResponse } from '@/types/projects';
import type { PlanogramsResponse } from '@/types/planograms';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProjectErrorAlert from './components/ProjectErrorAlert';
import ProjectDetailsCard from './components/ProjectDetailsCard';
import ProjectPlanogramsCard from './components/ProjectPlanogramsCard';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params?.projectSlug as string;
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const { data, loading, error } = useFetch<ProjectResponse>(projectSlug ? `/projects/${projectSlug}/` : null);
  const project = data?.project || null;

  // Fetch planograms for this specific project
  const { data: planogramsData } = useFetch<PlanogramsResponse>(projectSlug ? `/projects/${projectSlug}/planograms/` : null);
  const projectPlanograms = planogramsData?.planograms || [];

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !project) {
    return <ProjectErrorAlert error={error} />;
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

      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {project && showProjectDetails && <ProjectDetailsCard project={project} projectSlug={projectSlug} />}

      {project && <ProjectPlanogramsCard projectSlug={projectSlug} planograms={projectPlanograms} />}
    </>
  );
}
