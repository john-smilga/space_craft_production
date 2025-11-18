'use client';

import { Button } from '@/components/ui/button';
import type { PlanogramResponse } from '@/types/planograms';
import { usePlanogramDownloadStore } from '@/stores/planogramDownloadStore';
import { usePlanogramLayoutStore } from '@/stores/planogramLayoutStore';
import toast from 'react-hot-toast';

interface PlanogramDownloadButtonProps {
  planogram: PlanogramResponse['planogram'] | null;
}

export default function PlanogramDownloadButton({ planogram }: PlanogramDownloadButtonProps) {
  const { loading, downloadPlanogram } = usePlanogramDownloadStore();
  const { gridData } = usePlanogramLayoutStore();

  const handleDownload = async () => {
    if (!planogram) {
      toast.error('No planogram data available');
      return;
    }

    await downloadPlanogram(planogram, gridData);
  };

  return (
    <Button onClick={handleDownload} size='sm' variant='outline' className='border-primary text-primary hover:bg-primary hover:text-primary-foreground' disabled={loading}>
      {loading ? 'Preparing...' : 'Download'}
    </Button>
  );
}
