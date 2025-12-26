'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';;

type StoreType = z.infer<typeof schemas.Store>;

export function useStoreQuery(storeSlug: string | null) {
  return useQuery({
    queryKey: ['store', storeSlug],
    queryFn: async (): Promise<StoreType> => {
      if (!storeSlug) {
        throw new Error('Store slug is required');
      }
      const response = await api.get(`/stores/${storeSlug}/`);
      return schemas.Store.parse(response.data);
    },
    enabled: !!storeSlug,
  });
}

