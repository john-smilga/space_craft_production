'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramAIStore } from '@/stores/planogramAIStore';

export default function AIOverviewDialog() {
  const { dialogOpen, setDialogOpen, loading, error, overview } = usePlanogramAIStore();

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>AI Overview</DialogTitle>
          <DialogDescription>Analysis and insights for this planogram</DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          {loading && (
            <div className='flex items-center justify-center py-12'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
          )}
          {error && (
            <Alert variant='destructive'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {overview && !loading && (
            <div className='prose prose-sm max-w-none'>
              <p className='whitespace-pre-wrap text-sm leading-relaxed'>{overview}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
