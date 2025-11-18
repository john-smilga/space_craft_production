'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { PlanogramResponse } from '@/types/planograms';
import NameInput from './components/NameInput';
import ProjectDisplay from './components/ProjectDisplay';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InfoAlert from '@/components/InfoAlert';

interface CreatePlanogramVariables {
  name: string;
  project_slug: string;
}

export default function CreatePlanogramPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  const [name, setName] = useState('New Planogram');

  // Fetch project to verify it exists and get its name
  const { data: projectData } = useFetch<{ project: { name: string; slug: string } }>(projectSlug ? `/projects/${projectSlug}/` : null);
  const project = projectData?.project;

  const createPlanogramMutation = useMutation<PlanogramResponse, CreatePlanogramVariables>(
    async (variables) => {
      const response = await api.post('/planograms/', variables);
      return response.data;
    },
    { toastResource: 'planogram' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createPlanogramMutation.reset();

    if (!projectSlug) {
      return;
    }

    const result = await createPlanogramMutation.mutate({
      name,
      project_slug: projectSlug,
    });

    if (result.data) {
      // Redirect to planogram detail page
      router.push(`/dashboard/projects/${projectSlug}/planograms/${result.data.planogram.slug}`);
    }
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Create New Planogram</h1>
        <p className='text-muted-foreground'>Set up a new planogram for your project</p>
      </div>

      <div className='max-w-4xl space-y-6'>
        <InfoAlert>
          <strong>Note:</strong> The planogram will be created with default values which can be changed later.
        </InfoAlert>

        <Card>
        <CardContent className='p-6'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <NameInput value={name} onChange={setName} />

            <ProjectDisplay projectName={project?.name || null} />

            {createPlanogramMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{createPlanogramMutation.error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-3 pt-4 border-t border-border'>
              <Button type='button' onClick={() => router.back()} variant='outline'>
                Cancel
              </Button>
              <Button type='submit' disabled={createPlanogramMutation.loading || !name || !projectSlug}>
                {createPlanogramMutation.loading ? 'Creating...' : 'Create Planogram'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
