'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InfoDialog } from './info-dialog';

type InfoButtonProps = {
  planogramSlug: string;
};

export function InfoButton({ planogramSlug }: InfoButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant='outline' size='sm' onClick={() => setOpen(true)}>
        <Info className='h-4 w-4 mr-2' />
        Info
      </Button>
      <InfoDialog planogramSlug={planogramSlug} open={open} onOpenChange={setOpen} />
    </>
  );
}
