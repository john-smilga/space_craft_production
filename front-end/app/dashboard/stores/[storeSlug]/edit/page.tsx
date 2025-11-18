'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { StoreResponse } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UpdateStoreVariables {
  name?: string;
  store_code?: string;
  address?: string;
}

export default function EditStorePage() {
  const router = useRouter();
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  const { data, loading, error } = useFetch<StoreResponse>(storeSlug ? `/stores/${storeSlug}/` : null);
  const store = data?.store || null;

  const [name, setName] = useState('');
  const [storeCode, setStoreCode] = useState('');
  const [address, setAddress] = useState('');

  // Populate form when store data loads
  useEffect(() => {
    if (store) {
      setName(store.name);
      setStoreCode(store.store_code);
      setAddress(store.address);
    }
  }, [store]);

  const updateStoreMutation = useMutation<StoreResponse, UpdateStoreVariables>(
    async (variables) => {
      const response = await api.put(`/stores/${storeSlug}/`, variables);
      return response.data;
    },
    { toastResource: 'store' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreMutation.reset();

    const result = await updateStoreMutation.mutate({
      name,
      store_code: storeCode,
      address,
    });

    if (result.data) {
      router.push(`/dashboard/stores/${result.data.store.slug}`);
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !store) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error}</AlertDescription>
        <Button onClick={() => router.push('/dashboard/stores')} variant='outline' className='mt-4'>
          Back to Stores
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Edit Store</h1>
        <p className='text-muted-foreground'>Update store information</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Update the details for this store</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Store Name *'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder='e.g., Walmart Supercenter Sarasota'
            />

            <FormField
              label='Store Code *'
              type='text'
              value={storeCode}
              onChange={(e) => setStoreCode(e.target.value)}
              required
              placeholder='e.g., SARASOTA-001'
            />
            <p className='text-xs text-muted-foreground -mt-2'>Unique identifier for this store within your company</p>

            <div className='space-y-2'>
              <Label htmlFor='address'>Address *</Label>
              <Textarea
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                placeholder='e.g., 123 Main Street&#10;Sarasota, FL 34236'
              />
            </div>

            {updateStoreMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{updateStoreMutation.error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={updateStoreMutation.loading}>
                {updateStoreMutation.loading ? 'Updating...' : 'Update Store'}
              </Button>
              <Button type='button' onClick={() => router.push(`/dashboard/stores/${storeSlug}`)} disabled={updateStoreMutation.loading} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
