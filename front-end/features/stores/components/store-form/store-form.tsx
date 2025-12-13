'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAdmin } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateStoreMutation, useUpdateStoreMutation, useStoreQuery } from '../../queries';

interface StoreFormProps {
  storeSlug?: string;
  mode: 'create' | 'edit';
}

export function StoreForm({ storeSlug, mode }: StoreFormProps) {
  useRequireAdmin();
  const router = useRouter();

  const { data: store, isLoading: loadingStore } = useStoreQuery(mode === 'edit' && storeSlug ? storeSlug : null);

  const [name, setName] = useState(mode === 'create' ? 'First Store Tampa' : '');
  const [storeCode, setStoreCode] = useState(mode === 'create' ? 'TAMPA-001' : '');
  const [address, setAddress] = useState(mode === 'create' ? '123 Main Street,\nTampa, FL 33602' : '');

  const createMutation = useCreateStoreMutation();
  const updateMutation = useUpdateStoreMutation(storeSlug || '');

  const mutation = mode === 'create' ? createMutation : updateMutation;

  useEffect(() => {
    if (mode === 'edit' && store && !name && !storeCode && !address) {
      Promise.resolve().then(() => {
        setName(store.name);
        setStoreCode(store.store_code);
        setAddress(store.address);
      });
    }
  }, [mode, store, name, storeCode, address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const input = {
      name,
      store_code: storeCode,
      address,
    };

    try {
      const result = await mutation.mutateAsync(input);
      if (mode === 'create') {
        router.push('/dashboard/stores');
      } else if (result) {
        router.push(`/dashboard/stores/${result.slug}`);
      }
    } catch {
      // Error handled by mutation
    }
  };

  if (mode === 'edit' && loadingStore) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>{mode === 'create' ? 'Create Store' : 'Edit Store'}</h1>
        <p className='text-muted-foreground'>{mode === 'create' ? 'Add a new store location' : 'Update store information'}</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>{mode === 'create' ? 'Enter the details for the new store location' : 'Update the details for this store'}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Store Name *'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='e.g., Walmart Supercenter Seattle'
            />
            <p className='text-xs text-muted-foreground -mt-2'>Format: Store Area City</p>

            <FormField
              label='Store Code *'
              type='text'
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              required
              placeholder='e.g., SEA-001'
            />
            <p className='text-xs text-muted-foreground -mt-2'>Format: CITY-NUMBER</p>

            <div className='space-y-2'>
              <Label htmlFor='address'>Address *</Label>
              <Textarea
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                placeholder='Store address'
              />
            </div>

            {mutation.isError && (
              <Alert variant='destructive'>
                <AlertDescription>{mutation.error?.message || `Failed to ${mode} store`}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={mutation.isPending}>
                {mutation.isPending ? (mode === 'create' ? 'Creating...' : 'Updating...') : (mode === 'create' ? 'Create Store' : 'Update Store')}
              </Button>
              <Button
                type='button'
                onClick={() => router.push(mode === 'edit' && storeSlug ? `/dashboard/stores/${storeSlug}` : '/dashboard/stores')}
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

