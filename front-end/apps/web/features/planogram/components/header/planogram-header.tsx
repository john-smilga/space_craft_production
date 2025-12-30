'use client';

import { Menu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanogramStore } from '../../store/usePlanogramStore';
import { AIOverviewButton } from './ai-overview-button';
import { DownloadButton } from './download-button';
import { InfoButton } from './info-button';

type PlanogramHeaderProps = {
  planogramSlug: string;
  projectSlug: string;
  planogramName: string;
  projectName: string;
};

export function PlanogramHeader({
  planogramSlug,
  planogramName,
  projectName,
}: PlanogramHeaderProps) {
  const toggleSidebar = usePlanogramStore((state) => state.toggleSidebar);
  const toggleAddProductsSidebar = usePlanogramStore((state) => state.toggleAddProductsSidebar);

  return (
    <div className='flex items-start justify-between'>
      <div>
        <h1 className='text-3xl font-bold mb-2'>{planogramName}</h1>
        <p className='text-muted-foreground'>Project: {projectName}</p>
      </div>
      <div className='flex gap-2'>
        <AIOverviewButton planogramSlug={planogramSlug} />
        <DownloadButton planogramSlug={planogramSlug} planogramName={planogramName} />
        <InfoButton planogramSlug={planogramSlug} />
        <Button variant='outline' size='sm' onClick={toggleAddProductsSidebar} className='gap-2'>
          <Plus className='h-4 w-4' />
          Add Products
        </Button>
        <Button variant='outline' size='sm' onClick={toggleSidebar} className='gap-2'>
          <Menu className='h-4 w-4' />
          Browse Products
        </Button>
      </div>
    </div>
  );
}
