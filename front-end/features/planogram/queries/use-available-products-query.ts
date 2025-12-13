import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import api from '@/lib/axios';
import { usePlanogramStore } from '../store';
import type { AvailableItem } from '../types';

interface AvailableProductsParams {
  categoryIds: number[];
  season: string;
}

async function fetchAvailableProducts(params: AvailableProductsParams): Promise<AvailableItem[]> {
  if (params.categoryIds.length === 0) {
    return [];
  }

  const categoryIdsStr = params.categoryIds.join(',');
  const { data } = await api.get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${params.season}`);
  const products = data.products || [];

  return products.map((product: {
    id: number;
    name: string;
    category?: string;
    color?: string;
    overall_score?: number;
    margin?: number;
    pack_width_in: number;
    pack_height_in: number;
  }) => ({
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
  const setAvailableItems = usePlanogramStore.use.setAvailableItems();
  const setLoadingAvailableItems = usePlanogramStore.use.setLoadingAvailableItems();

  const query = useQuery({
    queryKey: ['available-products', params.categoryIds, params.season],
    queryFn: () => fetchAvailableProducts(params),
    enabled: params.categoryIds.length > 0,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    setLoadingAvailableItems(query.isLoading);
  }, [query.isLoading, setLoadingAvailableItems]);

  useEffect(() => {
    if (query.data) {
      setAvailableItems(query.data);
    }
  }, [query.data, setAvailableItems]);

  return query;
}

