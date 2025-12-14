import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type DisplayType = z.infer<typeof schemas.Display>;

export function useStandardDisplaysQuery() {
  return useQuery({
    queryKey: ['standard-displays'],
    queryFn: async (): Promise<{ standards: DisplayType[] }> => {
      const response = await api.get('/displays/standards/');
      const validatedResponse = schemas.PaginatedDisplayList.parse(response.data);
      return { standards: validatedResponse.results };
    },
  });
}

