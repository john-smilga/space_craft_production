import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { DisplayTypesResponse } from '../types';

export function useDisplayTypesQuery() {
  return useQuery({
    queryKey: ['display-types'],
    queryFn: async (): Promise<DisplayTypesResponse> => {
      const response = await api.get('/displays/types/');
      return response.data;
    },
  });
}

