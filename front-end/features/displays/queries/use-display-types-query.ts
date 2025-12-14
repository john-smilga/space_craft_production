import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type DisplayTypeType = z.infer<typeof schemas.DisplayType>;

export function useDisplayTypesQuery() {
  return useQuery({
    queryKey: ['display-types'],
    queryFn: async (): Promise<{ types: DisplayTypeType[] }> => {
      const response = await api.get('/displays/types/');
      const validatedResponse = schemas.PaginatedDisplayTypeList.parse(response.data);
      return { types: validatedResponse.results };
    },
  });
}

