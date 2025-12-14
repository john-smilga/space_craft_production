'use client';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

export function useDeleteDisplayMutation(displaySlug: string) {
  return useAppMutation<void, void>(
    async () => {
      await api.delete(`/displays/${displaySlug}/`);
    },
    {
      successMessage: 'Display deleted successfully',
      errorMessage: 'Failed to delete display',
      invalidateQueries: [['displays'], ['display', displaySlug]],
    }
  );
}

