import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import type { Store } from '../types';

export function useStoresQuery() {
  return usePaginatedQuery<Store>(
    ['stores'],
    async () => {
      const response = await api.get('/stores/');
      return response.data;
    }
  );
}

