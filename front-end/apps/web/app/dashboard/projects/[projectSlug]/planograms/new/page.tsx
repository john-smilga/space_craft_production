'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useProjectQuery } from '@/features/projects';
import { useCreatePlanogramMutation } from '@/features/planogram';
import { NameInput, ProjectDisplay } from '@/features/planogram/components';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InfoAlert from '@/components/InfoAlert';

export default function CreatePlanogramPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  const [name, setName] = useState('New Planogram');

  // Fetch project to verify it exists and get its name
  const { data: project } = useProjectQuery(projectSlug);

  const createPlanogramMutation = useCreatePlanogramMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project) {
      return;
    }

    try {
      const result = await createPlanogramMutation.mutateAsync({
        name,
        project: project.id,
        // Provide minimal required defaults - user can edit later
        season: 'summer',
        width_in: '48',
        height_in: '60',
        shelf_count: 4,
        category_ids: [1], // Default to Beef category
      });

      // Redirect to planogram detail page
      router.push(`/dashboard/projects/${projectSlug}/planograms/${result.planogram.slug}`);
    } catch {
      // Error handled by mutation
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

            {createPlanogramMutation.isError && (
              <Alert variant='destructive'>
                <AlertDescription>{(createPlanogramMutation.error as Error)?.message || 'Failed to create planogram'}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-3 pt-4 border-t border-border'>
              <Button type='button' onClick={() => router.back()} variant='outline'>
                Cancel
              </Button>
              <Button type='submit' disabled={createPlanogramMutation.isPending || !name || !projectSlug}>
                {createPlanogramMutation.isPending ? 'Creating...' : 'Create Planogram'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </>
  );
}
