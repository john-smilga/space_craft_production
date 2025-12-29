'use client';

import { useParams } from 'next/navigation';
import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  usePlanogramQuery,
  PlanogramDetailForm,
  ProductSidebar,
  AddProductsSidebar,
  usePlanogramStore,
  Grid,
} from '@/features/planogram';

export default function PlanogramPage() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  const projectSlug = params?.projectSlug as string;

  const { data: planogram, isLoading, error } = usePlanogramQuery(planogramSlug);
  const toggleSidebar = usePlanogramStore((state) => state.toggleSidebar);
  const toggleAddProductsSidebar = usePlanogramStore((state) => state.toggleAddProductsSidebar);
  const addProductsSidebarOpen = usePlanogramStore((state) => state.addProductsSidebarOpen);

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
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>{planogram.name}</h1>
            <p className='text-muted-foreground'>
              Project: {planogram.project_name}
            </p>
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={toggleAddProductsSidebar}
              className='gap-2'
            >
              <Plus className='h-4 w-4' />
              Add Products
            </Button>
            <Button
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

        <PlanogramDetailForm
          planogramSlug={planogramSlug}
          projectSlug={projectSlug}
          planogram={planogram}
        />

        <Grid planogramSlug={planogramSlug} />
      </div>
    </>
  );
}
