'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { usePlanogramFormStore } from '@/stores/planogramFormStore';
import { usePlanogramForm } from '../hooks/usePlanogramForm';
import { usePlanogramData } from '../hooks/usePlanogramData';
import { useParams } from 'next/navigation';

export default function PlanogramNameField() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const { name, isEditingName, setName, setIsEditingName } = usePlanogramFormStore();
  const { planogramData, refetchPlanogram } = usePlanogramData(planogramSlug);
  const { handleSaveName, handleCancelEditName, updatePlanogramMutation } = usePlanogramForm(
    planogramSlug,
    planogramData,
    refetchPlanogram,
    async () => {} // fetchAvailableProducts not needed here
  );

  return (
    <div className='lg:col-span-3 space-y-2'>
      <Label>Name</Label>
      {isEditingName ? (
        <div className='space-y-2'>
          <Input type='text' value={name} onChange={(e) => setName(e.target.value)} disabled={updatePlanogramMutation.loading} />
          <div className='flex gap-2'>
            <Button onClick={handleSaveName} disabled={updatePlanogramMutation.loading} size='sm' className='cursor-pointer'>
              {updatePlanogramMutation.loading ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={handleCancelEditName} disabled={updatePlanogramMutation.loading} variant='outline' size='sm' className='cursor-pointer'>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex items-center gap-2'>
          <p className='text-sm'>{name || 'Loading...'}</p>
          <Button onClick={() => setIsEditingName(true)} variant='ghost' size='sm' className='h-auto p-0 text-primary hover:underline cursor-pointer'>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
