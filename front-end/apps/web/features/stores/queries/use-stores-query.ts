'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type StoreType = z.infer<typeof schemas.StoreList>;

export function useStoresQuery() {
  return usePaginatedQuery<StoreType>(
    ['stores'],
    async () => {
      const response = await api.get('/stores/');
      return schemas.PaginatedStoreListList.parse(response.data);
    }
  );
}

