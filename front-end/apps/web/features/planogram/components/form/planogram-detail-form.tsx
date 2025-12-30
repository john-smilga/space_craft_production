'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FormInput } from '@/components/ui/form-input';
import { planogramFormSchema, type PlanogramFormData } from '../../schemas';
import { useUpdatePlanogramMutation } from '../../queries/use-update-planogram-mutation';
import { PlanogramDisplayField } from './planogram-display-field';
import { PlanogramCategoriesField } from './planogram-categories-field';
import { ShelfCountField } from './shelf-count-field';
import { schemas } from '@/lib/generated/api-schemas';
import { usePlanogramStore } from '../../store/usePlanogramStore';

type Planogram = z.infer<typeof schemas.Planogram>;

type PlanogramDetailFormProps = {
  planogramSlug: string;
  projectSlug: string;
  planogram: Planogram;
};

export function PlanogramDetailForm({ planogramSlug, projectSlug, planogram }: PlanogramDetailFormProps) {
  const router = useRouter();
  const updateMutation = useUpdatePlanogramMutation();
  const [forceRegenerate, setForceRegenerate] = useState(false);

  const toggleSidebar = usePlanogramStore((state) => state.toggleSidebar);
  const toggleAddProductsSidebar = usePlanogramStore((state) => state.toggleAddProductsSidebar);

  const {
    register,
    control,
    handleSubmit,
    reset,
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
          force_regenerate: forceRegenerate,
        },
      },
      {
        onSuccess: (updatedPlanogram) => {
          setForceRegenerate(false);

          // Reset form with new data from server to clear isDirty state
          reset({
            name: updatedPlanogram.name,
            shelf_count: updatedPlanogram.shelf_count,
            display: updatedPlanogram.display,
            category_ids: updatedPlanogram.category_ids,
          });

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

          <div className='space-y-3 pt-4 border-t border-border'>
            <h3 className='text-sm font-medium text-muted-foreground'>Product Management</h3>
            <div className='flex gap-2'>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={toggleAddProductsSidebar}
                className='gap-2'
              >
                <Plus className='h-4 w-4' />
                Add Products
              </Button>
              <Button
                type='button'
                variant='outline'
                size='sm'
                onClick={toggleSidebar}
                className='gap-2'
              >
                <Menu className='h-4 w-4' />
                Browse Products
              </Button>
            </div>
          </div>

          <div className='space-y-4 pt-4 border-t border-border'>
            <div className='flex items-center gap-2'>
              <Checkbox
                id='force-regenerate'
                checked={forceRegenerate}
                onCheckedChange={(checked) => setForceRegenerate(!!checked)}
              />
              <Label htmlFor='force-regenerate' className='cursor-pointer'>
                Reset layout
              </Label>
            </div>

            <Button
              type='submit'
              disabled={(!isDirty && !forceRegenerate) || updateMutation.isPending}
            >
              {updateMutation.isPending ? 'Regenerating...' : 'Regenerate'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
