'use client';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';

export function useDeletePlanogramMutation(planogramSlug: string) {
  return useAppMutation<void, void>(
    async () => {
      await api.delete(`/planograms/${planogramSlug}/`);
    },
    {
      successMessage: 'Planogram deleted successfully',
      errorMessage: 'Failed to delete planogram',
      invalidateQueries: [['planograms']], // Invalidates all queries starting with ['planograms']
    }
  );
}
