'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRequireAdmin } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { FormTextarea } from '@/components/ui/form-textarea';
import { useCreateStoreMutation } from '../../queries';
import { schemas } from '@/lib/generated/api-schemas';

type CreateStoreFormData = z.infer<typeof schemas.StoreCreateRequest>;

export function CreateStoreForm() {
  useRequireAdmin();
  const router = useRouter();
  const mutation = useCreateStoreMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStoreFormData>({
    resolver: zodResolver(schemas.StoreCreateRequest),
    defaultValues: {
      name: 'First Store Tampa',
      store_code: 'TAMPA-001',
      address: '123 Main Street,\nTampa, FL 33602',
    },
  });

  const onSubmit = (data: CreateStoreFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard/stores');
      },
    });
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
                {mutation.isPending ? 'Creating...' : 'Create Store'}
              </Button>
              <Button
                type='button'
                onClick={() => router.push('/dashboard/stores')}
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
