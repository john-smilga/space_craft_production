'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { usePlanogramForm, usePlanogramData } from '@/features/planogram';

export default function PlanogramDeleteButton() {
  const router = useRouter();
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  const projectSlug = params?.projectSlug as string;
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const { planogramData, refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
  const { deleteMutation } = usePlanogramForm(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      await deleteMutation.mutateAsync({ slug: planogramSlug });
      router.push(`/dashboard/projects/${projectSlug}`);
    } catch {
      setDeleteConfirm(false);
    }
  };

  return (
    <div className='mt-8'>
      <div className='flex gap-3 justify-end'>
        <Button onClick={handleDelete} disabled={deleteMutation.isPending} variant={deleteConfirm ? 'destructive' : 'outline'} className={deleteConfirm ? '' : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'}>
          {deleteMutation.isPending ? 'Deleting...' : deleteConfirm ? 'Confirm Delete' : 'Delete Planogram'}
        </Button>
        {deleteConfirm && (
          <Button onClick={() => setDeleteConfirm(false)} variant='outline' disabled={deleteMutation.isPending}>
            Cancel
          </Button>
        )}
      </div>
      {deleteMutation.error && (
        <Alert variant='destructive' className='mt-4'>
          <AlertDescription>{deleteMutation.error.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
