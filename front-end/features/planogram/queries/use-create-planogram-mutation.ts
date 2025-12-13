import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { Planogram } from '../types';

interface CreatePlanogramInput {
  name: string;
  project: number;
  season?: string;
  width_in?: number;
  height_in?: number;
  depth_in?: number | null;
  shelf_count?: number;
  shelf_spacing?: number | null;
  category_ids?: number[];
}

export function useCreatePlanogramMutation() {
  return useAppMutation<Planogram, CreatePlanogramInput>(
    async (input) => {
      const response = await api.post<Planogram>('/planograms/', input);
      return response.data;
    },
    {
      successMessage: 'Planogram created successfully',
      errorMessage: 'Failed to create planogram',
      invalidateQueries: [['planograms'], ['projects']],
    }
  );
}

