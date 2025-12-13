'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramStore } from '@/features/planogram';

export default function AIOverviewDialog() {
  const aiDialogOpen = usePlanogramStore.use.aiDialogOpen();
  const setAIDialogOpen = usePlanogramStore.use.setAIDialogOpen();
  const aiLoading = usePlanogramStore.use.aiLoading();
  const aiError = usePlanogramStore.use.aiError();
  const aiOverview = usePlanogramStore.use.aiOverview();

  return (
    <Dialog open={aiDialogOpen} onOpenChange={setAIDialogOpen}>
      <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>AI Overview</DialogTitle>
          <DialogDescription>Analysis and insights for this planogram</DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          {aiLoading && (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
          )}
          {aiError && (
            <Alert variant='destructive'>
              <AlertDescription>{aiError}</AlertDescription>
            </Alert>
          )}
          {aiOverview && !aiLoading && (
            <div className='prose prose-sm max-w-none'>
              <p className='whitespace-pre-wrap text-sm leading-relaxed'>{aiOverview}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
