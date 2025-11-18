'use client';

import { usePlanogramUIStore } from '@/stores/planogramUIStore';

interface RowHeaderProps {
  rowName: string;
  rowId: number;
}

export default function RowHeader({ rowName, rowId }: RowHeaderProps) {
  const { rowNotifications } = usePlanogramUIStore();
  const rowNotification = rowNotifications[rowId];

  return (
    <div className='mb-2'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm font-semibold'>{rowName}</h3>
      </div>
      {rowNotification && <div className='mt-1 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block'>{rowNotification}</div>}
    </div>
  );
}
