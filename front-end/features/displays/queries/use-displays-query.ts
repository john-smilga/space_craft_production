import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import type { Display } from '../types';

export function useDisplaysQuery() {
  return usePaginatedQuery<Display>(
    ['displays'],
    async () => {
      const response = await api.get('/displays/');
      return response.data;
    }
  );
}

