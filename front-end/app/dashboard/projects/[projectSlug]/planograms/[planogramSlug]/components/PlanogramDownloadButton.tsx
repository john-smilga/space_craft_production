'use client';

import { Button } from '@/components/ui/button';
import type { Planogram } from '@/features/planogram/types';
import { usePlanogramStore } from '@/features/planogram';
import toast from 'react-hot-toast';

interface PlanogramDownloadButtonProps {
  planogram: Planogram | null;
}

export default function PlanogramDownloadButton({ planogram }: PlanogramDownloadButtonProps) {
  const downloadLoading = usePlanogramStore.use.downloadLoading();
  const downloadPlanogram = usePlanogramStore.use.downloadPlanogram();
  const gridData = usePlanogramStore.use.gridData();

  const handleDownload = async () => {
    if (!planogram) {
      toast.error('No planogram data available');
      return;
    }

    await downloadPlanogram(planogram, gridData);
  };

  return (
    <Button onClick={handleDownload} size='sm' variant='outline' className='border-primary text-primary hover:bg-primary hover:text-primary-foreground' disabled={downloadLoading}>
      {downloadLoading ? 'Preparing...' : 'Download'}
    </Button>
  );
}
