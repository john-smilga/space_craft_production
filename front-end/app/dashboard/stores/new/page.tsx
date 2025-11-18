'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { StoreResponse } from '@/types/stores';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreateStoreVariables {
  name: string;
  store_code: string;
  address: string;
}

export default function CreateStorePage() {
  const router = useRouter();
  const [name, setName] = useState('First Store Tampa');
  const [storeCode, setStoreCode] = useState('TAMPA-001');
  const [address, setAddress] = useState('123 Main Street,\nTampa, FL 33602');

  const createStoreMutation = useMutation<StoreResponse, CreateStoreVariables>(
    async (variables) => {
      const response = await api.post('/stores/', variables);
      return {
        store: response.data.store,
      };
    },
    { toastResource: 'store' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createStoreMutation.reset();

    const result = await createStoreMutation.mutate({
      name,
      store_code: storeCode,
      address,
    });

    if (result.data) {
      router.push('/dashboard/stores');
    }
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Create Store</h1>
        <p className='text-muted-foreground'>Add a new store location</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Store Information</CardTitle>
          <CardDescription>Enter the details for the new store location</CardDescription>
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

            {createStoreMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{createStoreMutation.error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={createStoreMutation.loading}>
                {createStoreMutation.loading ? 'Creating...' : 'Create Store'}
              </Button>
              <Button type='button' onClick={() => router.push('/dashboard/stores')} disabled={createStoreMutation.loading} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
