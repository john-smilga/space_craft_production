'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIOverviewDialog } from './ai-overview-dialog';

type AIOverviewButtonProps = {
  planogramSlug: string;
};

export function AIOverviewButton({ planogramSlug }: AIOverviewButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='default' size='sm' onClick={() => setOpen(true)}>
        AI Overview
      </Button>
      <AIOverviewDialog planogramSlug={planogramSlug} open={open} onOpenChange={setOpen} />
    </>
  );
}
