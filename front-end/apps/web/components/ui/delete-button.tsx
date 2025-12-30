'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from './button';
import type { UseMutationResult } from '@tanstack/react-query';

type DeleteButtonProps = {
  onDelete: UseMutationResult<void, Error, void>;
  redirectPath: string;
  resourceName: string;
  size?: 'sm' | 'default' | 'lg';
  showIcon?: boolean;
  className?: string;
};

export function DeleteButton({
  onDelete,
  redirectPath,
  resourceName,
  size = 'sm',
  showIcon = true,
  className = '',
}: DeleteButtonProps) {
  const router = useRouter();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    try {
      await onDelete.mutateAsync();
      router.push(redirectPath);
    } catch {
      // Error handled by mutation
      setDeleteConfirm(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        variant={deleteConfirm ? 'destructive' : 'outline'}
        size={size}
        onClick={handleDelete}
        disabled={onDelete.isPending}
        className={deleteConfirm ? '' : 'border-red-600 text-red-600 hover:bg-red-50'}
      >
        {showIcon && <Trash2 className='h-4 w-4 mr-2' />}
        {onDelete.isPending
          ? 'Deleting...'
          : deleteConfirm
            ? 'Confirm Delete'
            : `Delete ${resourceName}`}
      </Button>
      {deleteConfirm && (
        <Button variant='outline' size={size} onClick={() => setDeleteConfirm(false)}>
          Cancel
        </Button>
      )}
    </div>
  );
}
