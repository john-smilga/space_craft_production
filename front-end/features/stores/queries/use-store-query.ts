import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Store } from '../types';

export function useStoreQuery(storeSlug: string | null) {
  return useQuery({
    queryKey: ['store', storeSlug],
    queryFn: async (): Promise<Store> => {
      if (!storeSlug) {
        throw new Error('Store slug is required');
      }
      const response = await api.get(`/stores/${storeSlug}/`);
      return response.data;
    },
    enabled: !!storeSlug,
  });
}

