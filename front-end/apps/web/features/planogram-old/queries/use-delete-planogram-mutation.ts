'use client';
import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

type DeletePlanogramVariables = {
  slug: string;
}

export function useDeletePlanogramMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeletePlanogramVariables>({
    mutationFn: async (variables) => {
      await api.delete(`/planograms/${variables.slug}/`);
    },
    onSuccess: (_data, variables) => {
      queryClient.removeQueries({ queryKey: ['planograms', variables.slug] });
      queryClient.invalidateQueries({ queryKey: ['planograms'] });
      toast.success('Planogram deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete planogram');
    },
  });
}

