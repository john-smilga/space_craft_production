'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramStore, usePlanogramForm, usePlanogramData } from '@/features/planogram';
import { usePlanogramFormContext } from '../planogram-form-provider';
import { useParams } from 'next/navigation';
import { AIOverviewDialog } from '../ai-overview-dialog/ai-overview-dialog';

export function PlanogramActions() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const sidebarOpen = usePlanogramStore.use.sidebarOpen();
  const toggleSidebar = usePlanogramStore.use.toggleSidebar();

  const { watch, formState } = usePlanogramFormContext();
  const formValues = watch();

  const { planogramData, refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
  const { handleRegenerate, updatePlanogramMutation } = usePlanogramForm(
    planogramSlug,
    planogramData ?? null,
    refetchPlanogram,
    fetchAvailableProducts,
    formValues
  );

  return (
    <>
      <div className='mt-4 pt-4 border-t flex gap-4'>
        <Button
          onClick={handleRegenerate}
          disabled={updatePlanogramMutation.isPending || !formValues.name?.trim() || !formState.isValid}
          className='w-full md:w-auto cursor-pointer'
        >
          {updatePlanogramMutation.isPending ? 'Updating...' : 'Regenerate'}
        </Button>
        <Button onClick={toggleSidebar} variant='outline' className='w-full md:w-auto cursor-pointer'>
          {sidebarOpen ? 'Hide Products' : 'Explore Products'}
        </Button>
      </div>

      {updatePlanogramMutation.error && (
        <Alert variant='destructive' className='mt-4'>
          <AlertDescription>{updatePlanogramMutation.error.message}</AlertDescription>
        </Alert>
      )}

      <AIOverviewDialog />
    </>
  );
}

