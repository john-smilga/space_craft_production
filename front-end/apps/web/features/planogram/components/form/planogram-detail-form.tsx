'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { planogramFormSchema, type PlanogramFormData } from '../../schemas';
import { useUpdatePlanogramMutation } from '../../queries/use-update-planogram-mutation';
import { PlanogramDisplayField } from './planogram-display-field';
import { PlanogramCategoriesField } from './planogram-categories-field';
import { ShelfCountField } from './shelf-count-field';
import { schemas } from '@/lib/generated/api-schemas';

type Planogram = z.infer<typeof schemas.Planogram>;

type PlanogramDetailFormProps = {
  planogramSlug: string;
  projectSlug: string;
  planogram: Planogram;
};

export function PlanogramDetailForm({ planogramSlug, projectSlug, planogram }: PlanogramDetailFormProps) {
  const router = useRouter();
  const updateMutation = useUpdatePlanogramMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<PlanogramFormData>({
    resolver: zodResolver(planogramFormSchema),
    defaultValues: {
      name: planogram.name,
      shelf_count: planogram.shelf_count,
      display: planogram.display,
      category_ids: planogram.category_ids,
    },
  });

  const onSubmit = (data: PlanogramFormData) => {
    updateMutation.mutate(
      {
        slug: planogramSlug,
        data: {
          name: data.name,
          shelf_count: data.shelf_count,
          display: data.display,
          category_ids: data.category_ids,
        },
      },
      {
        onSuccess: (updatedPlanogram) => {
          if (updatedPlanogram.slug !== planogramSlug) {
            const newPath = `/dashboard/projects/${projectSlug}/planograms/${updatedPlanogram.slug}`;
            router.push(newPath);
          }
        },
      }
    );
  };

  return (
    <Card>
      <CardContent className='p-6'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div className='grid grid-cols-4 gap-4'>
            <FormInput
              name='name'
              label='Name *'
              type='text'
              register={register}
              error={errors.name}
              placeholder='e.g., Summer Meat Display - Aisle 3'
            />

            <ShelfCountField control={control} error={errors.shelf_count} />

            <div className='col-span-2'>
              <PlanogramDisplayField control={control} error={errors.display} />
            </div>
          </div>

          <PlanogramCategoriesField control={control} error={errors.category_ids} />

          <div className='flex gap-3 pt-4 border-t border-border'>
            <Button
              type='submit'
              disabled={!isDirty || updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Regenerating...' : 'Regenerate'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
