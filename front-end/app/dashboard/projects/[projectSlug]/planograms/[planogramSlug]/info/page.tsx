'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePlanogramQuery } from '@/features/planogram';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DetailField from '@/components/DetailField';
import { formatDate } from '@/lib/utils';

export default function PlanogramInfoPage() {
  const router = useRouter();
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  const projectSlug = params?.projectSlug as string;

  const { data, isLoading, error } = usePlanogramQuery(planogramSlug);
  const planogram = data?.planogram || null;

  if (isLoading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  if (error && !planogram) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{(error as Error).message || 'Failed to load planogram'}</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-6 flex items-center gap-3'>
        <Button onClick={() => router.push(`/dashboard/projects/${projectSlug}/planograms/${planogramSlug}`)} variant='outline' size='sm'>
          Go Back
        </Button>
      </div>

      {error && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{(error as Error).message || 'Failed to load planogram'}</AlertDescription>
        </Alert>
      )}

      {planogram && (
        <Card>
          <CardContent className='p-6'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4 gap-y-8'>
              <DetailField label='Created At' value={formatDate(planogram.created_at)} />
              <DetailField label='Created By' value={planogram.created_by_username || 'N/A'} />
              <DetailField label='Modified At' value={formatDate(planogram.updated_at)} />
              <DetailField label='Modified By' value={planogram.updated_by_username || 'N/A'} />
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
