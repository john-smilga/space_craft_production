'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreateProjectMutation, useUpdateProjectMutation, useProjectQuery } from '../../queries';
import { useStoresQuery } from '@/features/stores';
import { NoStoresAlert } from '../no-stores-alert/no-stores-alert';

type ProjectFormProps = {
  projectSlug?: string;
  mode: 'create' | 'edit';
}

const projectFormSchema = z.object({
  name: z.string().min(1).max(255),
  storeSlug: z.string().min(1).optional(),
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

export function ProjectForm({ projectSlug, mode }: ProjectFormProps) {
  const router = useRouter();

  const { data: project, isLoading: loadingProject } = useProjectQuery(mode === 'edit' && projectSlug ? projectSlug : null);

  const { data: storesData } = useStoresQuery();
  const stores = storesData || [];

  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation(projectSlug || '');

  const mutation = mode === 'create' ? createMutation : updateMutation;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: mode === 'create' ? 'New Project 111' : '',
      storeSlug: '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && project) {
      reset({
        name: project.name,
        storeSlug: project.store_slug || '',
      });
    }
  }, [mode, project, reset]);

  const onSubmit = (data: ProjectFormData) => {
    if (mode === 'create') {
      if (!data.storeSlug) return;

      const selectedStore = stores.find((store) => store.slug === data.storeSlug);
      if (!selectedStore) return;

      const submitData = {
        name: data.name,
        store: selectedStore.id,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutation.mutate(submitData as any, {
        onSuccess: () => {
          router.push('/dashboard/projects');
        }
      });
    } else {
      const submitData = {
        name: data.name,
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mutation.mutate(submitData as any, {
        onSuccess: () => {
          router.push('/dashboard/projects');
        }
      });
    }
  };

  const hasStores = stores.length > 0;

  const storeOptions = stores.map((store) => ({
    value: store.slug,
    label: `${store.name} (${store.store_code})`,
  }));

  if (mode === 'edit' && loadingProject) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (mode === 'edit' && !project) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>Project not found</AlertDescription>
        <Button onClick={() => router.push('/dashboard/projects')} variant='outline' className='mt-4'>
          Back to Projects
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>{mode === 'create' ? 'Create Project' : 'Edit Project'}</h1>
        <p className='text-muted-foreground'>{mode === 'create' ? 'Add a new project to a store' : 'Update project information'}</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>{mode === 'create' ? 'Enter the details for the new project' : 'Update the details for this project'}</CardDescription>
        </CardHeader>
        <CardContent>
          {mode === 'create' && !hasStores && <NoStoresAlert />}

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            {mode === 'create' && (
              <Controller
                name='storeSlug'
                control={control}
                render={({ field }) => (
                  <FormSelectField
                    label='Store *'
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    options={storeOptions}
                    placeholder='Select a store'
                    disabled={!hasStores}
                  />
                )}
              />
            )}

            {mode === 'create' && !hasStores && (
              <p className='text-xs text-muted-foreground -mt-2'>No stores available. Please create a store first.</p>
            )}

            <FormInput
              name='name'
              label='Project Name *'
              type='text'
              register={register}
              error={errors.name}
              placeholder={mode === 'create' ? 'e.g., Meat Section, Bakery' : 'e.g., Meat Section Remodel'}
              disabled={mode === 'create' && !hasStores}
            />

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={mutation.isPending || (mode === 'create' && !hasStores)}>
                {mutation.isPending ? (mode === 'create' ? 'Creating...' : 'Updating...') : (mode === 'create' ? 'Create Project' : 'Update Project')}
              </Button>
              <Button
                type='button'
                onClick={() => router.push(mode === 'edit' && projectSlug ? `/dashboard/projects/${projectSlug}` : '/dashboard/projects')}
                disabled={mutation.isPending}
                variant='outline'
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
