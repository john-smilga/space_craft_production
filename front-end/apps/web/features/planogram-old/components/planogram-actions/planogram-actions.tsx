'use client';

import type { UseFormWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramStore, usePlanogramForm, usePlanogramData } from '@/features/planogram-old';
import type { PlanogramDetailResponse } from '@/features/planogram-old/types';
import { AIOverviewDialog } from '../ai-overview-dialog/ai-overview-dialog';
import type { PlanogramFormData } from '@/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page';

type PlanogramActionsProps = {
  watch: UseFormWatch<PlanogramFormData>;
  planogramSlug: string;
  planogramData: PlanogramDetailResponse | null | undefined;
};

export function PlanogramActions({ watch, planogramSlug, planogramData }: PlanogramActionsProps) {
  const sidebarOpen = usePlanogramStore.use.sidebarOpen();
  const toggleSidebar = usePlanogramStore.use.toggleSidebar();

  const formValues = watch();

  const { refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
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
          disabled={updatePlanogramMutation.isPending || !formValues.name?.trim()}
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

