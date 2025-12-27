'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
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

export function ProjectForm({ projectSlug, mode }: ProjectFormProps) {
  const router = useRouter();

  const { data: project, isLoading: loadingProject } = useProjectQuery(mode === 'edit' && projectSlug ? projectSlug : null);

  const { data: storesData } = useStoresQuery();
  const stores = storesData || [];

  const [name, setName] = useState(mode === 'create' ? 'New Project 111' : '');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('');

  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation(projectSlug || '');

  const mutation = mode === 'create' ? createMutation : updateMutation;

  useEffect(() => {
    if (mode === 'edit' && project && !name && !selectedStoreSlug) {
      Promise.resolve().then(() => {
        setName(project.name);
        setSelectedStoreSlug(project.store_slug || '');
      });
    }
  }, [mode, project, name, selectedStoreSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStoreSlug) {
      return;
    }

    const selectedStore = stores.find((store) => store.slug === selectedStoreSlug);
    if (!selectedStore) {
      return;
    }

    const input = {
      name,
      store: selectedStore.id,
    };

    try {
      await mutation.mutateAsync(input);
      router.push('/dashboard/projects');
    } catch {
      // Error handled by mutation
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
        {mode === 'create' && (
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Enter the details for the new project</CardDescription>
          </CardHeader>
        )}
        {mode === 'edit' && (
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Update the details for this project</CardDescription>
          </CardHeader>
        )}
        <CardContent className={mode === 'create' ? '' : 'p-6'}>
          {mode === 'create' && !hasStores && <NoStoresAlert />}

          <form onSubmit={handleSubmit} className='space-y-4'>
            {mode === 'edit' && (
              <FormField
                label='Project Name *'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='e.g., Meat Section Remodel'
              />
            )}

            <FormSelectField
              label='Store *'
              value={selectedStoreSlug}
              onValueChange={setSelectedStoreSlug}
              options={storeOptions}
              placeholder='Select a store'
              disabled={mode === 'create' && !hasStores}
            />

            {mode === 'create' && !hasStores && (
              <p className='text-xs text-muted-foreground -mt-2'>No stores available. Please create a store first.</p>
            )}

            {mode === 'create' && (
              <FormField
                label='Project Name *'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={!hasStores}
                placeholder='e.g., Meat Section, Bakery'
              />
            )}

            {mutation.isError && (
              <Alert variant='destructive'>
                <AlertDescription>{mutation.error?.message || `Failed to ${mode} project`}</AlertDescription>
              </Alert>
            )}

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

