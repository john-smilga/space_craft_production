'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { PlanogramResponse } from '@/types/planograms';
import { usePlanogramAIStore } from '@/stores/planogramAIStore';
import { useAIOverview } from '../hooks/useAIOverview';
import PlanogramDownloadButton from './PlanogramDownloadButton';

interface PlanogramHeaderProps {
  planogram: PlanogramResponse['planogram'] | null;
}

export default function PlanogramHeader({ planogram }: PlanogramHeaderProps) {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const { setDialogOpen, loading: aiLoading, reset } = usePlanogramAIStore();
  const { fetchAIOverview } = useAIOverview();

  const handleAIOverview = async () => {
    setDialogOpen(true);
    reset();
    await fetchAIOverview(planogramSlug);
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
