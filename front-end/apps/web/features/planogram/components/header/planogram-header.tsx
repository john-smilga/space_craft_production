'use client';

import { AIOverviewButton } from './ai-overview-button';
import { DownloadButton } from './download-button';
import { InfoButton } from './info-button';

type PlanogramHeaderProps = {
  planogramSlug: string;
  planogramName: string;
  projectName: string;
};

export function PlanogramHeader({
  planogramSlug,
  planogramName,
  projectName,
}: PlanogramHeaderProps) {
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
      </div>
    </div>
  );
}
