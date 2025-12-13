import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import type { Planogram } from '../types';

export function usePlanogramsQuery() {
  return usePaginatedQuery<Planogram>(
    ['planograms'],
    async () => {
      const response = await api.get('/planograms/');
      return response.data;
    }
  );
}

