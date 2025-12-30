'use client';

import { useParams } from 'next/navigation';
import {
  usePlanogramQuery,
  PlanogramDetailForm,
  ProductSidebar,
  AddProductsSidebar,
  usePlanogramStore,
  Grid,
  PlanogramHeader,
} from '@/features/planogram';
import { DeleteButton } from '@/components/ui/delete-button';
import { useDeletePlanogramMutation } from '@/features/planogram/queries';

export default function PlanogramPage() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  const projectSlug = params?.projectSlug as string;

  const { data: planogram, isLoading, error } = usePlanogramQuery(planogramSlug);
  const addProductsSidebarOpen = usePlanogramStore((state) => state.addProductsSidebarOpen);
  const deleteMutation = useDeletePlanogramMutation(planogramSlug);

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 w-64 bg-muted animate-pulse rounded' />
        <div className='h-96 bg-muted animate-pulse rounded' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-destructive'>
        <h2 className='text-xl font-semibold mb-2'>Error Loading Planogram</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!planogram) {
    return (
      <div className='text-muted-foreground'>
        <p>Planogram not found</p>
      </div>
    );
  }

  return (
    <>
      <ProductSidebar />
      {addProductsSidebarOpen && <AddProductsSidebar />}

      <div className='space-y-6'>
        <PlanogramHeader
          planogramSlug={planogramSlug}
          planogramName={planogram.name}
          projectName={planogram.project_name}
        />

        <PlanogramDetailForm
          planogramSlug={planogramSlug}
          projectSlug={projectSlug}
          planogram={planogram}
        />

        <Grid planogramSlug={planogramSlug} />

        <div className='pb-6 flex justify-end mt-12'>
          <DeleteButton
            onDelete={deleteMutation}
            redirectPath={`/dashboard/projects/${projectSlug}`}
            resourceName='Planogram'
            size='default'
            showIcon={true}
          />
        </div>
      </div>
    </>
  );
}
