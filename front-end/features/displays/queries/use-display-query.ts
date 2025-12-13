import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { DisplayResponse } from '../types';

export function useDisplayQuery(displaySlug: string | null) {
  return useQuery({
    queryKey: ['display', displaySlug],
    queryFn: async (): Promise<DisplayResponse> => {
      if (!displaySlug) {
        throw new Error('Display slug is required');
      }
      const response = await api.get(`/displays/${displaySlug}/`);
      return response.data;
    },
    enabled: !!displaySlug,
  });
}

