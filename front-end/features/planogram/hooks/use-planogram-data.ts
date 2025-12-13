import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { PlanogramDetailResponse, Planogram } from '../types';
import type { DisplaysResponse, StandardDisplaysResponse } from '@/features/displays/types';
import type { AvailableItem } from '../types';
import type { SelectableCategoriesResponse } from '@/types/categories';
import { usePlanogramStore } from '../store';

export function usePlanogramData(planogramSlug: string | null) {
  const initializeForm = usePlanogramStore.use.initializeForm();
  const initializeLayouts = usePlanogramStore.use.initializeLayouts();
  const setAvailableItems = usePlanogramStore.use.setAvailableItems();
  const setLoadingAvailableItems = usePlanogramStore.use.setLoadingAvailableItems();

  // Fetch planogram data
  const planogramQuery = useQuery({
    queryKey: ['planograms', planogramSlug],
    queryFn: async (): Promise<PlanogramDetailResponse> => {
      if (!planogramSlug) {
        throw new Error('Planogram slug is required');
      }
      const { data } = await api.get(`/planograms/${planogramSlug}/`);
      return data;
    },
    enabled: !!planogramSlug,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch company displays (custom displays)
  const { data: displaysData } = useQuery({
    queryKey: ['displays'],
    queryFn: async (): Promise<DisplaysResponse> => {
      const { data } = await api.get('/displays/');
      return data;
    },
  });
  const companyDisplays = displaysData?.displays || [];

  // Fetch standard displays
  const { data: standardsData } = useQuery({
    queryKey: ['standard-displays'],
    queryFn: async (): Promise<StandardDisplaysResponse> => {
      const { data } = await api.get('/displays/standards/');
      return data;
    },
  });
  const standardDisplays = standardsData?.standards || [];

  // Fetch leaf categories (categories that have products directly as children, not subcategories)
  const leafCategoriesQuery = useQuery({
    queryKey: ['categories', 'leaf'],
    queryFn: async (): Promise<SelectableCategoriesResponse> => {
      const { data } = await api.get('/categories/leaf/');
      return data;
    },
  });
  const leafCategories = leafCategoriesQuery.data?.categories || [];

  // Fetch available products
  const fetchAvailableProducts = useCallback(
    async (overridePlanogram?: Planogram) => {
      const planogram = overridePlanogram || planogramQuery.data?.planogram;
      if (!planogram) {
        return;
      }

      const categoryIds = planogram.category_ids || [];
      const currentSeason = planogram.season || 'summer';

      if (categoryIds.length === 0) {
        setAvailableItems([]);
        return;
      }

      setLoadingAvailableItems(true);
      try {
        const categoryIdsStr = categoryIds.join(',');
        const response = await api.get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${currentSeason}`);
        const products = response.data.products || [];

        // Convert to AvailableItem format
        const items: AvailableItem[] = products.map((product: { id: number; name: string; category?: string; color?: string; overall_score?: number; margin?: number; pack_width_in: number; pack_height_in: number }) => ({
          id: product.id,
          name: product.name,
          category: product.category || 'Unknown',
          color: product.color || '#9ca3af',
          score: product.overall_score || 0,
          margin: product.margin || 0,
          pack_width_in: product.pack_width_in,
          pack_height_in: product.pack_height_in,
        }));

        setAvailableItems(items);
      } catch (error) {
        console.error('Error fetching available products:', error);
        setAvailableItems([]);
      } finally {
        setLoadingAvailableItems(false);
      }
    },
    [planogramQuery.data, setAvailableItems, setLoadingAvailableItems]
  );

  // Initialize form state from planogram data
  useEffect(() => {
    if (planogramQuery.data?.planogram) {
      const planogram = planogramQuery.data.planogram;

      // Use display ID directly
      const displayId = planogram.display?.id?.toString() || undefined;

      // Initialize form state
      initializeForm({
        name: planogram.name,
        display_id: displayId,
        season: planogram.season,
        shelf_count: planogram.shelf_count,
        width_in: planogram.width_in,
        height_in: planogram.height_in,
        category_ids: planogram.category_ids,
      });

      // Fetch available products when planogram loads
      fetchAvailableProducts();
    }
    // Only depend on planogram ID to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planogramQuery.data?.planogram?.id]);

  // Initialize layouts from planogram data
  useEffect(() => {
    if (planogramQuery.data?.layout) {
      initializeLayouts(planogramQuery.data.layout);
    }
  }, [planogramQuery.data?.layout, initializeLayouts]);

  return {
    planogramData: planogramQuery.data,
    planogramLoading: planogramQuery.isLoading,
    refetchPlanogram: planogramQuery.refetch,
    companyDisplays,
    standardDisplays,
    leafCategories,
    leafCategoriesLoading: leafCategoriesQuery.isLoading,
    leafCategoriesError: leafCategoriesQuery.error?.message,
    fetchAvailableProducts,
  };
}

