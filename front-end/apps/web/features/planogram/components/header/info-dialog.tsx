'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import DetailField from '@/components/DetailField';
import { formatDate } from '@/lib/utils';
import { usePlanogramQuery } from '../../queries';

type InfoDialogProps = {
  planogramSlug: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function InfoDialog({ planogramSlug, open, onOpenChange }: InfoDialogProps) {
  const { data: planogram, isLoading } = usePlanogramQuery(planogramSlug);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Planogram Information</DialogTitle>
          <DialogDescription>Creation and modification details</DialogDescription>
        </DialogHeader>
        <div className='mt-4'>
          {isLoading && (
            <div className='flex items-center justify-center py-8'>
              <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
            </div>
          )}
          {planogram && !isLoading && (
            <Card>
              <CardContent className='p-6'>
                <div className='grid grid-cols-2 gap-4 gap-y-8'>
                  <DetailField label='Created At' value={formatDate(planogram.created_at)} />
                  <DetailField label='Created By' value={planogram.created_by_username || 'N/A'} />
                  <DetailField label='Modified At' value={formatDate(planogram.updated_at)} />
                  <DetailField label='Modified By' value={planogram.updated_by_username || 'N/A'} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
