'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@/hooks/useMutation';
import { useFetch } from '@/hooks/useFetch';
import api from '@/lib/axios';
import type { ProjectResponse } from '@/types/projects';
import type { StoresResponse } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import NoStoresAlert from './NoStoresAlert';

interface CreateProjectVariables {
  name: string;
  store_slug: string;
}

export default function CreateProjectForm() {
  const router = useRouter();
  const [name, setName] = useState('New Project 111');
  const [selectedStoreSlug, setSelectedStoreSlug] = useState<string>('');

  // Always fetch stores (needed for dropdown)
  const { data: storesData } = useFetch<StoresResponse>('/stores/');
  const stores = storesData?.stores || [];

  const createProjectMutation = useMutation<ProjectResponse, CreateProjectVariables>(
    async (variables) => {
      const response = await api.post('/projects/', variables);
      return response.data;
    },
    { toastResource: 'project' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createProjectMutation.reset();

    if (!selectedStoreSlug) {
      return;
    }

    const result = await createProjectMutation.mutate({
      name,
      store_slug: selectedStoreSlug,
    });

    if (result.data) {
      router.push(`/dashboard/projects/${result.data.project.slug}`);
    }
  };

  // Check if stores exist
  const hasStores = stores.length > 0;

  // Prepare options for FormSelectField
  const storeOptions = stores.map((store) => ({
    value: store.slug,
    label: `${store.name} (${store.store_code})`,
  }));

  return (
    <Card className='max-w-2xl'>
      <CardContent className='p-6'>
        {!hasStores && <NoStoresAlert />}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <FormSelectField
            label='Store *'
            value={selectedStoreSlug}
            onValueChange={setSelectedStoreSlug}
            options={storeOptions}
            placeholder='Select a store'
            disabled={!hasStores}
          />

          {!hasStores && (
            <p className='text-xs text-muted-foreground -mt-2'>No stores available. Please create a store first.</p>
          )}

          <FormField
            label='Project Name *'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={!hasStores}
            placeholder='e.g., Meat Section, Bakery'
          />

          {createProjectMutation.error && (
            <Alert variant='destructive'>
              <AlertDescription>{createProjectMutation.error}</AlertDescription>
            </Alert>
          )}

          <div className='flex gap-2 pt-4'>
            <Button type='submit' disabled={createProjectMutation.loading || !hasStores}>
              {createProjectMutation.loading ? 'Creating...' : 'Create Project'}
            </Button>
            <Button type='button' onClick={() => router.back()} disabled={createProjectMutation.loading} variant='outline'>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
