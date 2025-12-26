'use client';
import { useUpdatePlanogramMutation, useSaveLayoutMutation, useDeletePlanogramMutation } from '../queries';
import type { PlanogramDetailResponse, Planogram, LayoutItem } from '../types';
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
  const selectedDisplay = usePlanogramStore.use.selectedDisplay();
  const setName = usePlanogramStore.use.setName();
  const setSelectedDisplay = usePlanogramStore.use.setSelectedDisplay();
  const setSeason = usePlanogramStore.use.setSeason();
  const setShelfCount = usePlanogramStore.use.setShelfCount();
  const setSelectedCategoryIds = usePlanogramStore.use.setSelectedCategoryIds();
  const updateMutation = useUpdatePlanogramMutation();
  const saveLayoutMutation = useSaveLayoutMutation();
  const deleteMutation = useDeletePlanogramMutation();

  // Save layout handler
  const handleSaveLayout = async (layout: Record<number, LayoutItem[]>) => {

    if (!planogramData?.planogram) {
      return;
    }

    try {
      // Save only the layout with items - no other planogram fields
      await saveLayoutMutation.mutateAsync({
        slug: planogramSlug,
        layout,
        preserve_layout: true,
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

    const updates: Record<string, unknown> = {};

    // Include name if it changed
    if (name.trim() !== planogramData.planogram.name) {
      updates.name = name.trim();
    }

    // Only include fields that have changed
    if (season && season !== planogramData.planogram.season) {
      updates.season = season;
    }
    if (shelfCount > 0 && shelfCount !== (planogramData.planogram.shelf_count ?? 1)) {
      updates.shelf_count = shelfCount;
    }
    if (selectedCategoryIds.length > 0) {
      const currentIds = Array.isArray(planogramData.planogram.category_ids) ? planogramData.planogram.category_ids : [];
      if (JSON.stringify(selectedCategoryIds.sort()) !== JSON.stringify(currentIds.sort())) {
        updates.category_ids = selectedCategoryIds;
      }
    }
    if (selectedDisplay && selectedDisplay !== planogramData.planogram.display?.toString()) {
      updates.display = parseInt(selectedDisplay, 10);
    }

    // Always set preserve_layout to false when regenerating
    updates.preserve_layout = false;

    // Only make request if there are changes
    if (Object.keys(updates).length > 0) {
      try {
        const result = await updateMutation.mutateAsync({
          slug: planogramSlug,
          name: name.trim(),
          width_in: widthIn.toString(),
          height_in: heightIn.toString(),
          shelf_count: shelfCount > 0 ? shelfCount : (planogramData!.planogram.shelf_count ?? 1),
          ...updates,
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
          if (updatedPlanogram.display) {
            setSelectedDisplay(updatedPlanogram.display.toString());
          }

          // Refetch to get latest state (including display and slug)
          await refetchPlanogram();
          
          // Refetch available products after regeneration (in case season or categories changed)
          await fetchAvailableProducts();
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
  };
}

