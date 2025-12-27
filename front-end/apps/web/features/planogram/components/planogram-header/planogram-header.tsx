'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Planogram } from '@/features/planogram/types';
import { usePlanogramStore, useAIOverviewMutation } from '@/features/planogram';
import { PlanogramDownloadButton } from '../planogram-download-button/planogram-download-button';

type PlanogramHeaderProps = {
  planogram: Planogram | null;
}

export function PlanogramHeader({ planogram }: PlanogramHeaderProps) {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const setAIDialogOpen = usePlanogramStore.use.setAIDialogOpen();
  const aiLoading = usePlanogramStore.use.aiLoading();
  const aiMutation = useAIOverviewMutation();

  const handleAIOverview = async () => {
    setAIDialogOpen(true);
    await aiMutation.mutateAsync({ slug: planogramSlug });
  };

  if (!planogram) {
    return null;
  }

  return (
    <div className='mb-6 flex items-center gap-6'>
      <h1 className='text-3xl font-bold'>{planogram.name}</h1>
      <Button onClick={handleAIOverview} disabled={aiLoading} size='sm'>
        {aiLoading ? 'Generating...' : 'AI Overview'}
      </Button>
      <PlanogramDownloadButton planogram={planogram} />
      <Button asChild variant='outline' size='sm'>
        <Link href={`/dashboard/projects/${params?.projectSlug}/planograms/${planogramSlug}/info`}>Info</Link>
      </Button>
    </div>
  );
}

