'use client';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

export function useDeleteStoreMutation(storeSlug: string) {
  return useAppMutation<void, void>(
    async () => {
      await api.delete(`/stores/${storeSlug}/`);
    },
    {
      successMessage: 'Store deleted successfully',
      errorMessage: 'Failed to delete store',
      invalidateQueries: [['stores'], ['store', storeSlug]],
    }
  );
}

