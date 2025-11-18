import { useEffect, useCallback } from 'react';
import { useFetch } from '@/hooks/useFetch';
import api from '@/lib/axios';
import type { PlanogramResponse } from '@/types/planograms';
import type { DisplaysResponse, StandardDisplaysResponse } from '@/types/displays';
import type { AvailableItem } from '@/types/planograms';
import { usePlanogramFormStore } from '@/stores/planogramFormStore';
import { usePlanogramLayoutStore } from '@/stores/planogramLayoutStore';
import { usePlanogramAvailableProductsStore } from '@/stores/planogramAvailableProductsStore';

export function usePlanogramData(planogramSlug: string | null) {
  const { initializeForm } = usePlanogramFormStore();
  const { setGridData, setLoading, initializeLayouts } = usePlanogramLayoutStore();
  const { setAvailableItems, setLoadingAvailableItems } = usePlanogramAvailableProductsStore();

  // Fetch planogram data
  const { data: planogramData, loading: planogramLoading, refetch: refetchPlanogram } = useFetch<PlanogramResponse>(planogramSlug ? `/planograms/${planogramSlug}/` : null);

  // Fetch company displays (custom displays)
  const { data: displaysData } = useFetch<DisplaysResponse>('/displays/');
  const companyDisplays = displaysData?.displays || [];

  // Fetch standard displays
  const { data: standardsData } = useFetch<StandardDisplaysResponse>('/displays/standards/');
  const standardDisplays = standardsData?.standards || [];

  // Fetch leaf categories (categories that have products directly as children, not subcategories)
  const { data: leafCategoriesData, loading: leafCategoriesLoading, error: leafCategoriesError } = useFetch<{ categories: Array<{ id: number; name: string; path: string }> }>('/categories/leaf/');
  const leafCategories = leafCategoriesData?.categories || [];

  // Fetch available products
  const fetchAvailableProducts = useCallback(
    async (overridePlanogram?: PlanogramResponse['planogram']) => {
      const planogram = overridePlanogram || planogramData?.planogram;
      if (!planogram) return;

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
        const items: AvailableItem[] = products.map((product: any) => ({
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
    [planogramData, setAvailableItems, setLoadingAvailableItems]
  );

  // Initialize form state from planogram data
  useEffect(() => {
    if (planogramData?.planogram) {
      const planogram = planogramData.planogram;

      // Use display ID directly
      const displayId = planogram.display?.id?.toString() || undefined;

      // Initialize form state
      initializeForm({
        name: planogram.name,
        display_id: displayId,
        season: planogram.season,
        shelf_count: planogram.shelf_count,
        category_ids: planogram.category_ids,
      });

      // Fetch available products when planogram loads
      fetchAvailableProducts();
    }
    // Only depend on planogram ID to avoid infinite loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planogramData?.planogram?.id]);

  // Initialize layouts when planogram data changes
  useEffect(() => {
    if (planogramData?.layout) {
      // Get current layouts from store
      const currentLayouts = usePlanogramLayoutStore.getState().rowLayouts;
      const currentGridData = usePlanogramLayoutStore.getState().gridData;

      // If we already have layouts initialized and gridData matches, skip re-initialization
      // This prevents flashing when saving layout (refetch happens but layout is already correct)
      if (currentGridData && Object.keys(currentLayouts).length > 0) {
        // Check if the layout structure matches (same rows, same number of items per row)
        const serverRowCount = planogramData.layout.rows.length;
        const currentRowCount = currentGridData.rows.length;

        if (serverRowCount === currentRowCount) {
          // Structure matches, check if item counts match for each row
          const layoutsMatch = planogramData.layout.rows.every((serverRow) => {
            const currentRow = currentGridData.rows.find((r) => r.id === serverRow.id);
            if (!currentRow) return false;
            const currentRowLayout = currentLayouts[serverRow.id] || [];
            return serverRow.items.length === currentRowLayout.length;
          });

          // If layouts match, skip re-initialization to prevent flashing
          if (layoutsMatch) {
            return;
          }
        }
      }

      // Initialize layouts in store
      initializeLayouts(planogramData.layout);
    } else if (!planogramLoading) {
      setLoading(false);
    }
  }, [planogramData, planogramLoading, initializeLayouts, setLoading]);

  return {
    planogramData,
    planogramLoading,
    refetchPlanogram,
    companyDisplays,
    standardDisplays,
    leafCategories,
    leafCategoriesLoading,
    leafCategoriesError,
    fetchAvailableProducts,
  };
}
