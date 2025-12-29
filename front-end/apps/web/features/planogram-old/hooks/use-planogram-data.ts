'use client';
import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { PlanogramDetailResponse, Planogram } from '../types';
import type { SelectableCategoriesResponse } from '@/types/categories';
import { usePlanogramStore } from '../store';
import { useStandardDisplaysQuery } from '@/features/displays';
import { schemas } from '@/lib/generated/api-schemas';
import { useDisplaysQuery } from '@/features/displays/queries';

// Use PlanogramDetail schema from generated API schemas
const PlanogramDetailResponseSchema = schemas.PlanogramDetail;

export function usePlanogramData(planogramSlug: string | null) {
  const initializeFromResponse = usePlanogramStore.use.initializeFromResponse();

  // Fetch planogram data
  const planogramQuery = useQuery({
    queryKey: ['planograms', planogramSlug],
    queryFn: async (): Promise<PlanogramDetailResponse> => {
      if (!planogramSlug) {
        throw new Error('Planogram slug is required');
      }
      const { data } = await api.get(`/planograms/${planogramSlug}/`);
      // Validate response structure matches expected format
      try {
        const validated = PlanogramDetailResponseSchema.parse(data);
        // Extract layout and return structured response
        const { layout, ...planogramData } = validated;
        return {
          planogram: planogramData as Planogram,
          layout: layout ?? undefined,
        };
      } catch (error) {
        console.error('Planogram response validation failed:', error);
        throw new Error('Invalid planogram response format');
      }
    },
    enabled: !!planogramSlug,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch company displays (custom displays)
  const { data: companyDisplays = [] } = useDisplaysQuery();

  // Fetch standard displays
  const { data: standardsData } = useStandardDisplaysQuery();
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

  // Fetch available products - kept for backward compatibility with hooks that call it
  const fetchAvailableProducts = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_overridePlanogram?: Planogram) => {
      // This is now a no-op since we use React Query for fetching products
      // Kept for backward compatibility with existing code
      return;
    },
    []
  );

  // Initialize grid layouts from planogram data
  useEffect(() => {
    if (planogramQuery.data?.layout) {
      initializeFromResponse(planogramQuery.data.layout);
    }
  }, [planogramQuery.data?.layout, initializeFromResponse]);

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

