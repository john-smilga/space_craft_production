import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type DisplayType = z.infer<typeof schemas.Display>;

export function useDisplayQuery(displaySlug: string | null) {
  return useQuery({
    queryKey: ['display', displaySlug],
    queryFn: async (): Promise<DisplayType> => {
      if (!displaySlug) {
        throw new Error('Display slug is required');
      }
      const response = await api.get(`/displays/${displaySlug}/`);
      return schemas.Display.parse(response.data);
    },
    enabled: !!displaySlug,
  });
}

