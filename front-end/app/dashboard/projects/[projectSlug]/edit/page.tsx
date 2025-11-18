'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { ProjectResponse } from '@/types/projects';
import type { StoresResponse } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import ProjectErrorAlert from '../components/ProjectErrorAlert';

interface UpdateProjectVariables {
  name?: string;
  store_slug?: string;
}

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  const { data, loading, error } = useFetch<ProjectResponse>(projectSlug ? `/projects/${projectSlug}/` : null);
  const project = data?.project || null;

  const { data: storesData } = useFetch<StoresResponse>('/stores/');
  const stores = storesData?.stores || [];

  const [name, setName] = useState('');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState('');

  // Populate form when project data loads
  useEffect(() => {
    if (project) {
      setName(project.name);
      setSelectedStoreSlug(project?.store?.slug || '');
    }
  }, [project]);

  const updateProjectMutation = useMutation<ProjectResponse, UpdateProjectVariables>(
    async (variables) => {
      const response = await api.put(`/projects/${projectSlug}/`, variables);
      return response.data;
    },
    { toastResource: 'project' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectMutation.reset();

    const result = await updateProjectMutation.mutate({
      name,
      store_slug: selectedStoreSlug,
    });

    if (result.data) {
      router.push(`/dashboard/projects/${result.data.project.slug}`);
    }
  };

  // Prepare options for FormSelectField
  const storeOptions = stores.map((store) => ({
    value: store.slug,
    label: `${store.name} (${store.store_code})`,
  }));

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !project) {
    return <ProjectErrorAlert error={error} />;
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Edit Project</h1>
        <p className='text-muted-foreground'>Update project information</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
          <CardDescription>Update the details for this project</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Project Name *'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='e.g., Meat Section Remodel'
            />

            <FormSelectField
              label='Store *'
              value={selectedStoreSlug}
              onValueChange={setSelectedStoreSlug}
              options={storeOptions}
              placeholder='Select a store'
            />

            {updateProjectMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{updateProjectMutation.error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={updateProjectMutation.loading}>
                {updateProjectMutation.loading ? 'Updating...' : 'Update Project'}
              </Button>
              <Button type='button' onClick={() => router.push(`/dashboard/projects/${projectSlug}`)} disabled={updateProjectMutation.loading} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
