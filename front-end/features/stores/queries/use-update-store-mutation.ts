import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { Store, UpdateStoreInput } from '../types';

export function useUpdateStoreMutation(storeSlug: string) {
  const queryClient = useQueryClient();

  return useAppMutation<Store, UpdateStoreInput>(
    async (input) => {
      const response = await api.put(`/stores/${storeSlug}/`, input);
      return response.data;
    },
    {
      successMessage: 'Store updated successfully',
      errorMessage: 'Failed to update store',
      invalidateQueries: [['stores'], ['store', storeSlug]],
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['store', data.slug] });
      },
    }
  );
}

