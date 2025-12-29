'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useProjectQuery } from '@/features/projects';
import { useCreatePlanogramMutation } from '@/features/planogram-old';
import { ProjectDisplay } from '@/features/planogram-old/components';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { Card, CardContent } from '@/components/ui/card';
import InfoAlert from '@/components/InfoAlert';

const planogramFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
});

type PlanogramFormData = z.infer<typeof planogramFormSchema>;

export default function CreatePlanogramPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  // Fetch project to verify it exists and get its name
  const { data: project } = useProjectQuery(projectSlug);

  const createPlanogramMutation = useCreatePlanogramMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PlanogramFormData>({
    resolver: zodResolver(planogramFormSchema),
    defaultValues: {
      name: 'New Planogram',
    },
  });

  const onSubmit = (data: PlanogramFormData) => {
    if (!project) {
      return;
    }

    createPlanogramMutation.mutate(
      {
        name: data.name,
        project: project.id,
        // Backend will provide all defaults:
        // - display: auto-selected (latest custom or first standard)
        // - season: summer
        // - category_ids: [1] (Beef)
        // - dimensions: from auto-selected display
      },
      {
        onSuccess: (result) => {
          router.push(`/dashboard/projects/${projectSlug}/planograms/${result.planogram.slug}`);
        }
      }
    );
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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <FormInput
              name='name'
              label='Name *'
              type='text'
              register={register}
              error={errors.name}
              placeholder='e.g., Summer Meat Display - Aisle 3'
            />

            <ProjectDisplay projectName={project?.name || null} />

            <div className='flex gap-3 pt-4 border-t border-border'>
              <Button type='button' onClick={() => router.back()} variant='outline'>
                Cancel
              </Button>
              <Button type='submit' disabled={createPlanogramMutation.isPending || !projectSlug}>
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
