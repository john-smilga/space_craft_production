import { useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import type { PlanogramDetailResponse, Planogram } from '../types';
import type { AvailableItem } from '../types';
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

  // Fetch available products
  const fetchAvailableProducts = useCallback(
    async (overridePlanogram?: Planogram) => {
      const planogram = overridePlanogram || planogramQuery.data?.planogram;
      if (!planogram) {
        return;
      }

      const categoryIds = Array.isArray(planogram.category_ids) ? planogram.category_ids : [];
      const currentSeason = planogram.season || 'summer';

      if (categoryIds.length === 0) {
        setAvailableItems([]);
        return;
      }

      setLoadingAvailableItems(true);
      try {
        const categoryIdsStr = categoryIds.join(',');
        const response = await api.get(`/products/by-categories/?category_ids=${categoryIdsStr}&season=${currentSeason}`);

        // Validate response structure using generated schema
        const validatedResponse = schemas.ProductListResponse.parse(response.data);
        const products = validatedResponse.products || [];

        // Convert to AvailableItem format
        const items: AvailableItem[] = products.map((product) => ({
          id: product.id,
          name: product.name,
          category: product.category ?? 'Unknown',
          color: product.color ?? '#9ca3af',
          score: product.overall_score,
          margin: product.margin,
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

