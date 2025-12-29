'use client';
import { useUpdatePlanogramMutation, useSaveLayoutMutation, useDeletePlanogramMutation } from '../queries';
import type { PlanogramDetailResponse, Planogram, LayoutItem } from '../types';
import { usePlanogramStore } from '../store';

export type PlanogramFormData = {
  name: string;
  season: string;
  selectedDisplay?: string;
  shelfCount: number;
  selectedCategoryIds: number[];
};

export function usePlanogramForm(
  planogramSlug: string,
  planogramData: PlanogramDetailResponse | null | undefined,
  refetchPlanogram: () => Promise<unknown>,
  fetchAvailableProducts: (overridePlanogram?: Planogram) => Promise<void>,
  formValues?: PlanogramFormData
) {
  // Read widthIn and heightIn from Zustand (set by display selection for canvas)
  const widthIn = usePlanogramStore.use.widthIn();
  const heightIn = usePlanogramStore.use.heightIn();
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

    // If formValues not provided, function is being called from grid/delete button (not from form)
    if (!formValues) {
      return;
    }

    // Validate name is not empty
    if (!formValues.name || !formValues.name.trim()) {
      return;
    }

    const updates: Record<string, unknown> = {};

    // Include name if it changed
    if (formValues.name.trim() !== planogramData.planogram.name) {
      updates.name = formValues.name.trim();
    }

    // Only include fields that have changed
    if (formValues.season && formValues.season !== planogramData.planogram.season) {
      updates.season = formValues.season;
    }
    if (formValues.shelfCount > 0 && formValues.shelfCount !== (planogramData.planogram.shelf_count ?? 1)) {
      updates.shelf_count = formValues.shelfCount;
    }
    if (formValues.selectedCategoryIds.length > 0) {
      const currentIds = Array.isArray(planogramData.planogram.category_ids) ? planogramData.planogram.category_ids : [];
      if (JSON.stringify(formValues.selectedCategoryIds.sort()) !== JSON.stringify(currentIds.sort())) {
        updates.category_ids = formValues.selectedCategoryIds;
      }
    }
    if (formValues.selectedDisplay && formValues.selectedDisplay !== planogramData.planogram.display?.toString()) {
      updates.display = parseInt(formValues.selectedDisplay, 10);
    }

    // Always set preserve_layout to false when regenerating
    updates.preserve_layout = false;

    // Only make request if there are changes
    if (Object.keys(updates).length > 0) {
      try {
        await updateMutation.mutateAsync({
          slug: planogramSlug,
          name: formValues.name.trim(),
          width_in: widthIn.toString(),
          height_in: heightIn.toString(),
          shelf_count: formValues.shelfCount > 0 ? formValues.shelfCount : (planogramData!.planogram.shelf_count ?? 1),
          ...updates,
        });

        // Refetch to get latest state from server
        // Form will automatically update via reset() in the page component's useEffect
        await refetchPlanogram();

        // Refetch available products after regeneration (in case season or categories changed)
        await fetchAvailableProducts();
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

