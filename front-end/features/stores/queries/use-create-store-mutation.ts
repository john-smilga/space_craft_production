import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { Store, CreateStoreInput } from '../types';

export function useCreateStoreMutation() {
  return useAppMutation<Store, CreateStoreInput>(
    async (input) => {
      const response = await api.post('/stores/', input);
      return response.data;
    },
    {
      successMessage: 'Store created successfully',
      errorMessage: 'Failed to create store',
      invalidateQueries: [['stores']],
    }
  );
}

