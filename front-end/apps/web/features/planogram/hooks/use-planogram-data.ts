'use client';
import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import type { PlanogramDetailResponse, Planogram } from '../types';
import type { SelectableCategoriesResponse } from '@/types/categories';
import { usePlanogramStore } from '../store';
import { useStandardDisplaysQuery } from '@/features/displays';
import { schemas } from '@/lib/generated/api-schemas';
import { useDisplaysQuery } from '@/features/displays/queries';

// Schema for layout item structure (not in API schemas since it's frontend-specific structure)
const LayoutItemSchema = z.object({
  i: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  meta: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    color: z.string().optional(),
    score: z.number(),
    pack_width_in: z.number(),
    pack_height_in: z.number(),
  }),
});

const GridResponseSchema = z.object({
  grid: z.object({
    cols: z.number(),
    rows: z.number(),
    cellWidthIn: z.number(),
  }),
  rows: z.array(
    z.object({
      id: z.number(),
      category: z.string().nullable(),
      name: z.string(),
      items: z.array(LayoutItemSchema),
    })
  ),
});

// API returns planogram fields spread out + layout field
const PlanogramDetailResponseSchema = schemas.Planogram.extend({
  layout: GridResponseSchema.optional(),
});

export function usePlanogramData(planogramSlug: string | null) {
  const initializeForm = usePlanogramStore.use.initializeForm();
  const initializeLayouts = usePlanogramStore.use.initializeLayouts();

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
          planogram: planogramData,
          layout,
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

  // Initialize form state from planogram data
  useEffect(() => {
    if (planogramQuery.data?.planogram) {
      const planogram = planogramQuery.data.planogram;

      // Use display ID directly
      const displayId = planogram.display?.toString() || undefined;

      // Initialize form state
      initializeForm({
        name: planogram.name,
        display_id: displayId,
        season: planogram.season,
        shelf_count: planogram.shelf_count,
        width_in: parseFloat(planogram.width_in),
        height_in: parseFloat(planogram.height_in),
        category_ids: Array.isArray(planogram.category_ids) ? planogram.category_ids : [],
      });
    }
    // Only depend on planogram ID to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planogramQuery.data?.planogram?.id]);

  // Initialize grid layouts from planogram data
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

