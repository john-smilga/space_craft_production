import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { StandardDisplaysResponse } from '../types';

export function useStandardDisplaysQuery() {
  return useQuery({
    queryKey: ['standard-displays'],
    queryFn: async (): Promise<StandardDisplaysResponse> => {
      const response = await api.get('/displays/standards/');
      return response.data;
    },
  });
}

