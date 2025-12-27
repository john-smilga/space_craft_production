'use client';

import { useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form-input';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useCreateDisplayMutation, useDisplayTypesQuery, useStandardDisplaysQuery } from '../../queries';
import { schemas } from '@/lib/generated/api-schemas';

const displayFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  type: schemas.TypeEnum,
  width_in: z.string().min(1, 'Width is required').regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number'),
  height_in: z.string().min(1, 'Height is required').regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number'),
  depth_in: z.string().min(1, 'Depth is required').regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number'),
  shelf_count: z.string().min(1, 'Shelf count is required').regex(/^\d+$/, 'Must be a whole number'),
  shelf_spacing: z.string().regex(/^\d*(\.\d{1,2})?$/, 'Must be a valid number').optional(),
  selectedStandard: z.string().optional(),
});

type DisplayFormData = z.infer<typeof displayFormSchema>;

export function DisplayForm() {
  const router = useRouter();

  const { data: typesData } = useDisplayTypesQuery();
  const displayTypes = typesData?.types || [];

  const { data: standardsData } = useStandardDisplaysQuery();
  const standards = useMemo(() => standardsData?.standards || [], [standardsData]);

  const createMutation = useCreateDisplayMutation();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<DisplayFormData>({
    resolver: zodResolver(displayFormSchema),
    defaultValues: {
      name: '',
      type: undefined,
      width_in: '60',
      height_in: '48',
      depth_in: '24',
      shelf_count: '4',
      shelf_spacing: '',
      selectedStandard: '',
    },
  });

  const selectedStandard = watch('selectedStandard');

  // Handle standard template selection
  useEffect(() => {
    if (!selectedStandard) {
      return;
    }

    const standard = standards.find((s) => s.id.toString() === selectedStandard);

    if (!standard) {
      return;
    }

    setValue('name', standard.name);
    setValue('type', standard.type as z.infer<typeof schemas.TypeEnum>);
    setValue('width_in', standard.width_in);
    setValue('height_in', standard.height_in);
    setValue('depth_in', standard.depth_in || '24');
    setValue('shelf_count', standard.shelf_count.toString());
    setValue('shelf_spacing', standard.shelf_spacing || '');
  }, [selectedStandard, standards, setValue]);

  const onSubmit = (data: DisplayFormData) => {
    createMutation.mutate(
      {
        name: data.name,
        type: data.type!,
        width_in: data.width_in,
        height_in: data.height_in,
        depth_in: data.depth_in,
        shelf_count: parseInt(data.shelf_count),
        shelf_spacing: data.shelf_spacing || null,
      },
      {
        onSuccess: (result) => {
          router.push(`/dashboard/displays/${result.slug}`);
        }
      }
    );
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Create Display</h1>
        <p className='text-muted-foreground'>Add a new display type to your catalog</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Display Information</CardTitle>
          <CardDescription>Enter the details for the new display</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
              <Controller
                name='selectedStandard'
                control={control}
                render={({ field }) => (
                  <FormSelectField
                    label='Start from Standard Template (Optional)'
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    options={standards.map((standard) => ({
                      label: `${standard.name} (${standard.type}) - ${standard.width_in}" × ${standard.height_in}" × ${standard.depth_in || 24}"`,
                      value: standard.id.toString(),
                    }))}
                    placeholder='None'
                  />
                )}
              />
              <p className='text-xs text-muted-foreground mt-1'>Select a standard template to pre-fill all fields, then customize as needed</p>
            </div>

            <div>
              <FormInput
                name='name'
                label='Display Name *'
                type='text'
                register={register}
                error={errors.name}
                placeholder='e.g., 5-Foot Gondola'
              />
              <p className='text-xs text-muted-foreground mt-1'>Tip: Include width in the name (e.g., &quot;5-Foot Gondola&quot;) to help identify the display</p>
            </div>

            <div>
              <Controller
                name='type'
                control={control}
                render={({ field }) => (
                  <FormSelectField
                    label='Type *'
                    value={field.value || ''}
                    onValueChange={field.onChange}
                    options={displayTypes.map((typeOption) => ({
                      label: typeOption.label,
                      value: typeOption.value,
                    }))}
                    placeholder='Select a type'
                  />
                )}
              />
              {errors.type && <p className='text-sm text-destructive -mt-2'>{errors.type.message}</p>}
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <FormInput
                name='width_in'
                label='Width (inches) *'
                type='number'
                step='1'
                register={register}
                error={errors.width_in}
                placeholder='e.g., 48'
              />

              <FormInput
                name='height_in'
                label='Height (inches) *'
                type='number'
                step='1'
                register={register}
                error={errors.height_in}
                placeholder='e.g., 72'
              />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <FormInput
                name='shelf_count'
                label='Shelf Count *'
                type='number'
                register={register}
                error={errors.shelf_count}
                placeholder='e.g., 4'
              />

              <FormInput
                name='depth_in'
                label='Depth (inches) *'
                type='number'
                step='1'
                register={register}
                error={errors.depth_in}
                placeholder='e.g., 24'
              />

              <FormInput
                name='shelf_spacing'
                label='Shelf Spacing (inches)'
                type='number'
                step='1'
                register={register}
                error={errors.shelf_spacing}
                placeholder='e.g., 12'
              />
            </div>

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating...' : 'Create Display'}
              </Button>
              <Button type='button' onClick={() => router.push('/dashboard/displays')} disabled={createMutation.isPending} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

