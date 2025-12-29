import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';

type PathResponse = {
  products: boolean;
  items: Array<
    | { key: string; name: string }
    | { id: number; name: string; [key: string]: unknown }
  >;
};

type UseCategoryPathQueryParams = {
  categoryPath: string;
  season: string;
  enabled?: boolean;
};

export function useCategoryPathQuery({
  categoryPath,
  season,
  enabled = true,
}: UseCategoryPathQueryParams) {
  return useQuery({
    queryKey: ['category-path', categoryPath, season],
    queryFn: async () => {
      const response = await api.get<PathResponse>(
        `/categories/path/${categoryPath}/?season=${season}`
      );
      return response.data;
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
