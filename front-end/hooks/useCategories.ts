import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { CategoriesResponse, SelectableCategoriesResponse } from '@/types/categories';

export function useCategoriesQuery(parentSlug?: string | null) {
  return useQuery({
    queryKey: ['categories', parentSlug || 'root'],
    queryFn: async () => {
      const url = parentSlug ? `/categories/${parentSlug}/` : '/categories/';
      const response = await api.get<CategoriesResponse>(url);
      return response.data;
    },
    enabled: parentSlug !== null,
  });
}

export function useSelectableCategoriesQuery(parentSlug?: string | null, childSlug?: string | null) {
  return useQuery({
    queryKey: ['categories', 'selectable', parentSlug, childSlug],
    queryFn: async () => {
      if (!parentSlug || !childSlug) {
        throw new Error('Both parentSlug and childSlug are required');
      }
      const response = await api.get<SelectableCategoriesResponse>(`/categories/${parentSlug}/${childSlug}/`);
      return response.data;
    },
    enabled: !!parentSlug && !!childSlug,
  });
}

