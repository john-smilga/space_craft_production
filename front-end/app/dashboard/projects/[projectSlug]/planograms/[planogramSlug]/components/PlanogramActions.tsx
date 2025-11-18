'use client';

import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramSidebarStore } from '@/stores/planogramSidebarStore';
import { usePlanogramForm } from '../hooks/usePlanogramForm';
import { usePlanogramData } from '../hooks/usePlanogramData';
import { useParams } from 'next/navigation';
import AIOverviewDialog from './AIOverviewDialog';

export default function PlanogramActions() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const { sidebarOpen, toggleSidebar } = usePlanogramSidebarStore();
  const { planogramData, refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
  const { handleRegenerate, updatePlanogramMutation } = usePlanogramForm(planogramSlug, planogramData, refetchPlanogram, fetchAvailableProducts);

  return (
    <>
      <div className='mt-4 pt-4 border-t flex gap-4'>
        <Button onClick={handleRegenerate} disabled={updatePlanogramMutation.loading} className='w-full md:w-auto cursor-pointer'>
          {updatePlanogramMutation.loading ? 'Updating...' : 'Regenerate'}
        </Button>
        <Button onClick={toggleSidebar} variant='outline' className='w-full md:w-auto cursor-pointer'>
          {sidebarOpen ? 'Hide Products' : 'Explore Products'}
        </Button>
      </div>

      {updatePlanogramMutation.error && (
        <Alert variant='destructive' className='mt-4'>
          <AlertDescription>{updatePlanogramMutation.error}</AlertDescription>
        </Alert>
      )}

      <AIOverviewDialog />
    </>
  );
}
