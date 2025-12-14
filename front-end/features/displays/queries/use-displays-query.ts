import { z } from 'zod';
import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type DisplayType = z.infer<typeof schemas.DisplayList>;

export function useDisplaysQuery() {
  return usePaginatedQuery<DisplayType>(
    ['displays'],
    async () => {
      const response = await api.get('/displays/');
      return schemas.PaginatedDisplayListList.parse(response.data);
    }
  );
}

