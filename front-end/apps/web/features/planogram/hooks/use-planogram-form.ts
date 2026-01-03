'use client';
import { useUpdatePlanogramMutation, useSaveLayoutMutation, useDeletePlanogramMutation } from '../queries';
import type { PlanogramDetailResponse, Planogram, Season } from '../types';
import type { Layout } from '../components/grid-konva/utils/types';
import { usePlanogramStore } from '../store';

export function usePlanogramForm(
  planogramSlug: string,
  planogramData: PlanogramDetailResponse | null | undefined,
  refetchPlanogram: () => Promise<unknown>,
  fetchAvailableProducts: (overridePlanogram?: Planogram) => Promise<void>
) {
  const name = usePlanogramStore.use.name();
  const season = usePlanogramStore.use.season();
  const shelfCount = usePlanogramStore.use.shelfCount();
  const widthIn = usePlanogramStore.use.widthIn();
  const heightIn = usePlanogramStore.use.heightIn();
  const selectedCategoryIds = usePlanogramStore.use.selectedCategoryIds();
  const setName = usePlanogramStore.use.setName();
  const setSelectedDisplay = usePlanogramStore.use.setSelectedDisplay();
  const setSeason = usePlanogramStore.use.setSeason();
  const setShelfCount = usePlanogramStore.use.setShelfCount();
  const setSelectedCategoryIds = usePlanogramStore.use.setSelectedCategoryIds();
  const updateMutation = useUpdatePlanogramMutation();
  const saveLayoutMutation = useSaveLayoutMutation();
  const deleteMutation = useDeletePlanogramMutation(planogramSlug);

  // Save layout handler
  const handleSaveLayout = async (layout: Layout) => {
    if (!planogramData?.planogram) {
      return;
    }

    try {
      // Save only the layout with items - no other planogram fields
      await saveLayoutMutation.mutateAsync({
        slug: planogramSlug,
        layout: {
          grid: layout.grid,
          rows: layout.rows,
        },
      });

      await refetchPlanogram();
    } catch {
      // Error handled by mutations
    }
  };

  // Handle regenerate button click
  const handleRegenerate = async () => {
    if (!planogramData?.planogram) {
      return;
    }

    // Validate name is not empty
    if (!name || !name.trim()) {
      return;
    }

    try {
      const result = await updateMutation.mutateAsync({
        slug: planogramSlug,
        data: {
          name: name.trim(),
          width_in: widthIn.toString(),
          height_in: heightIn.toString(),
          shelf_count: shelfCount > 0 ? shelfCount : (planogramData.planogram.shelf_count ?? 1),
          season: (season || planogramData.planogram.season) as Season,
          category_ids: selectedCategoryIds.length > 0 ? selectedCategoryIds : planogramData.planogram.category_ids,
          force_regenerate: true,
        },
      });
      if (result) {
        const updatedPlanogram = result;

        // Update state directly from the response
        if (updatedPlanogram.name) {
          setName(updatedPlanogram.name);
        }
        if (updatedPlanogram.season) {
          setSeason(updatedPlanogram.season);
        }
        // Always update shelf_count, default to 1 if missing
        setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
        if (Array.isArray(updatedPlanogram.category_ids)) {
          setSelectedCategoryIds(updatedPlanogram.category_ids);
        }

        // Refetch to get latest state (including display and slug)
        await refetchPlanogram();

        // Refetch available products after regeneration (in case season or categories changed)
        await fetchAvailableProducts();
      }
    } catch {
      // Error handled by mutation
    }
  };

  // Handle display change - regenerate planogram immediately
  const handleDisplayChange = async (displayId: string) => {
    setSelectedDisplay(displayId);
    // Trigger regeneration when display changes
    if (planogramData?.planogram) {
      try {
        // Note: Display cannot be changed after creation per API limitations
        // Just update the UI state
        const result = await updateMutation.mutateAsync({
          slug: planogramSlug,
          data: {
            name: planogramData.planogram.name,
            width_in: planogramData.planogram.width_in,
            height_in: planogramData.planogram.height_in,
            shelf_count: planogramData.planogram.shelf_count,
            force_regenerate: true,
          },
        });
        if (result) {
          const updatedPlanogram = result;
          // Update shelf count from the new display
          setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
          await refetchPlanogram();
        }
      } catch {
        // Error handled by mutation
      }
    }
  };

  return {
    updatePlanogramMutation: updateMutation,
    deleteMutation,
    handleSaveLayout,
    handleRegenerate,
    handleDisplayChange,
  };
}

