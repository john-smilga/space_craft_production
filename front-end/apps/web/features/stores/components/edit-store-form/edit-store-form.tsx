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
import { useUpdateStoreMutation, useStoreQuery } from '../../queries';
import { schemas } from '@/lib/generated/api-schemas';

type EditStoreFormData = z.infer<typeof schemas.StoreUpdateRequest>;

type EditStoreFormProps = {
  storeSlug: string;
};

export function EditStoreForm({ storeSlug }: EditStoreFormProps) {
  useRequireAdmin();
  const router = useRouter();

  const { data: store, isLoading: loadingStore } = useStoreQuery(storeSlug);
  const mutation = useUpdateStoreMutation(storeSlug);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditStoreFormData>({
    resolver: zodResolver(schemas.StoreUpdateRequest),
    defaultValues: {
      name: '',
      address: '',
    },
  });

  useEffect(() => {
    if (store) {
      reset({
        name: store.name,
        address: store.address,
      });
    }
  }, [store, reset]);

  const onSubmit = (data: EditStoreFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/stores');
      },
    });
  };

  if (loadingStore) {
    return <div className='text-center py-8'>Loading...</div>;
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
                {mutation.isPending ? 'Updating...' : 'Update Store'}
              </Button>
              <Button
                type='button'
                onClick={() => router.push(`/dashboard/stores/${storeSlug}`)}
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
