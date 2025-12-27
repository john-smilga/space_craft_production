'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';
import type { AvailableItem } from '../types';

type AvailableProductsParams = {
  categoryIds: number[];
  season: string;
}

type ProductType = z.infer<typeof schemas.Product>;

async function fetchAvailableProducts(params: AvailableProductsParams): Promise<AvailableItem[]> {
  if (params.categoryIds.length === 0) {
    return [];
  }

  const categoryIdsStr = params.categoryIds.join(',');
  const { data } = await api.get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${params.season}`);
  const validatedResponse = schemas.ProductListResponse.parse(data);
  const products = validatedResponse.products || [];

  return products.map((product: ProductType) => ({
    id: product.id,
    name: product.name,
    category: product.category || 'Unknown',
    color: product.color || '#9ca3af',
    score: product.overall_score || 0,
    margin: product.margin || 0,
    pack_width_in: product.pack_width_in,
    pack_height_in: product.pack_height_in,
  }));
}

export function useAvailableProductsQuery(params: AvailableProductsParams) {
  return useQuery({
    queryKey: ['available-products', params.categoryIds, params.season],
    queryFn: () => fetchAvailableProducts(params),
    enabled: params.categoryIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });
}

