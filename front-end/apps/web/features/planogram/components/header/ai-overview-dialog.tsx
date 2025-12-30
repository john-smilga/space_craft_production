'use client';

import { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAIOverviewMutation } from '../../queries/use-ai-overview-mutation';

type AIOverviewDialogProps = {
  planogramSlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AIOverviewDialog({ planogramSlug, open, onOpenChange }: AIOverviewDialogProps) {
  const { mutate, data, isPending, isError, error } = useAIOverviewMutation();

  useEffect(() => {
    if (open) {
      mutate({ slug: planogramSlug });
    }
  }, [open, planogramSlug, mutate]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>AI Overview</DialogTitle>
          <DialogDescription>Analysis and insights for this planogram</DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          {isPending && (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
          )}
          {isError && (
            <Alert variant='destructive'>
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to generate AI overview'}
              </AlertDescription>
            </Alert>
          )}
          {data && !isPending && (
            <div className='prose prose-sm max-w-none'>
              <p className='whitespace-pre-wrap text-sm leading-relaxed'>{data}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
