import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { DisplayResponse, CreateDisplayInput } from '../types';

export function useCreateDisplayMutation() {
  return useAppMutation<DisplayResponse, CreateDisplayInput>(
    async (input) => {
      const response = await api.post('/displays/', input);
      return response.data;
    },
    {
      successMessage: 'Display created successfully',
      errorMessage: 'Failed to create display',
      invalidateQueries: [['displays']],
    }
  );
}

