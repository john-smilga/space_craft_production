'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRequireAdmin } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { useCreateStoreMutation, useUpdateStoreMutation, useStoreQuery } from '../../queries';

type StoreFormProps = {
  storeSlug?: string;
  mode: 'create' | 'edit';
}

const storeFormSchema = z.object({
  name: z.string().min(1).max(255),
  store_code: z.string().min(1).max(50).optional(),
  address: z.string().min(1),
});

type StoreFormData = z.infer<typeof storeFormSchema>;

export function StoreForm({ storeSlug, mode }: StoreFormProps) {
  useRequireAdmin();
  const router = useRouter();

  const { data: store, isLoading: loadingStore } = useStoreQuery(mode === 'edit' && storeSlug ? storeSlug : null);

  const createMutation = useCreateStoreMutation();
  const updateMutation = useUpdateStoreMutation(storeSlug || '');

  const mutation = mode === 'create' ? createMutation : updateMutation;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StoreFormData>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: mode === 'create' ? 'First Store Tampa' : '',
      store_code: mode === 'create' ? 'TAMPA-001' : undefined,
      address: mode === 'create' ? '123 Main Street,\nTampa, FL 33602' : '',
    },
  });

  useEffect(() => {
    if (mode === 'edit' && store) {
      reset({
        name: store.name,
        address: store.address,
      });
    }
  }, [mode, store, reset]);

  const onSubmit = (data: StoreFormData) => {
    const submitData = mode === 'edit'
      ? { name: data.name, address: data.address }
      : { name: data.name, store_code: data.store_code!, address: data.address };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutation.mutate(submitData as any, {
      onSuccess: () => {
        router.push('/dashboard/stores');
      }
    });
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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <FormInput
                name='name'
                label='Store Name *'
                type='text'
                register={register}
                error={errors.name}
                placeholder='e.g., Walmart Supercenter Seattle'
              />
              <p className='text-xs text-muted-foreground mt-1'>Format: Store Area City</p>
            </div>

            {mode === 'create' && (
              <div>
                <FormInput
                  name='store_code'
                  label='Store Code *'
                  type='text'
                  register={register}
                  error={errors.store_code}
                  placeholder='e.g., SEA-001'
                />
                <p className='text-xs text-muted-foreground mt-1'>Format: CITY-NUMBER</p>
              </div>
            )}

            <FormTextarea
              name='address'
              label='Address *'
              register={register}
              error={errors.address}
              rows={3}
              placeholder='Store address'
            />

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
