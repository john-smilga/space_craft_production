'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';

type AvailableProductsParams = {
  categoryIds: number[];
  season: string;
};

type Product = z.infer<typeof schemas.Product>;

async function fetchAvailableProducts(
  params: AvailableProductsParams
): Promise<Product[]> {
  if (params.categoryIds.length === 0) {
    return [];
  }

  const categoryIdsStr = params.categoryIds.join(',');
  const { data } = await api.get(
    `/products/by-categories/?category_ids=${categoryIdsStr}&season=${params.season}`
  );
  const validatedResponse = schemas.ProductListResponse.parse(data);

  return validatedResponse.products || [];
}

export function useAvailableProductsQuery(params: AvailableProductsParams) {
  return useQuery({
    queryKey: ['available-products', params.categoryIds, params.season],
    queryFn: () => fetchAvailableProducts(params),
    enabled: params.categoryIds.length > 0,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });
}
