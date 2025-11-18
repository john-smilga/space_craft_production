import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { PlanogramResponse, LayoutItem } from '@/types/planograms';
import { usePlanogramFormStore } from '@/stores/planogramFormStore';
import { usePlanogramLayoutStore } from '@/stores/planogramLayoutStore';

interface UpdatePlanogramVariables {
  name?: string;
  display_id?: number;
  season?: string;
  shelf_count?: number;
  category_ids?: number[];
  layout?: Record<number, LayoutItem[]>;
  preserve_layout?: boolean;
}

export function usePlanogramForm(planogramSlug: string, planogramData: PlanogramResponse | null, refetchPlanogram: () => Promise<void>, fetchAvailableProducts: (overridePlanogram?: PlanogramResponse['planogram']) => Promise<void>) {
  const { name, isEditingName, selectedDisplay, season, shelfCount, selectedCategoryIds, setName, setIsEditingName, setSelectedDisplay, setSeason, setShelfCount, setSelectedCategoryIds } = usePlanogramFormStore();

  // Update planogram mutation
  const updatePlanogramMutation = useMutation<PlanogramResponse, UpdatePlanogramVariables>(
    async (variables) => {
      const response = await api.put(`/planograms/${planogramSlug}/`, variables);
      return response.data;
    },
    { toastResource: 'planogram' }
  );

  // Delete mutation
  const deleteMutation = useMutation<void, void>(
    async () => {
      await api.delete(`/planograms/${planogramSlug}/`);
    },
    { toastResource: 'planogram' }
  );

  // Save layout handler
  const handleSaveLayout = async (layout: Record<number, LayoutItem[]>) => {
    // Set flag to skip next initialization to prevent flashing
    usePlanogramLayoutStore.getState().setSkipNextInitialization(true);

    const result = await updatePlanogramMutation.mutate({ layout, preserve_layout: true });
    if (result.data) {
      await refetchPlanogram();
    }
  };

  // Handle name save
  const handleSaveName = async () => {
    if (!name.trim()) {
      return;
    }

    if (name === planogramData?.planogram.name) {
      setIsEditingName(false);
      return;
    }

    const result = await updatePlanogramMutation.mutate({ name });
    if (result.data) {
      await refetchPlanogram();
      setIsEditingName(false);
    }
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
    setName(planogramData?.planogram.name || '');
    updatePlanogramMutation.reset();
  };

  // Handle regenerate button click
  const handleRegenerate = async () => {
    if (!planogramData?.planogram) return;

    const updates: UpdatePlanogramVariables = {};

    // Only include fields that have changed
    if (selectedDisplay) {
      const displayId = parseInt(selectedDisplay, 10);
      const currentDisplayId = planogramData.planogram.display?.id;
      if (displayId !== currentDisplayId) {
        updates.display_id = displayId;
      }
    }
    if (season && season !== planogramData.planogram.season) {
      updates.season = season;
    }
    if (shelfCount > 0 && shelfCount !== (planogramData.planogram.shelf_count ?? 1)) {
      updates.shelf_count = shelfCount;
    }
    if (selectedCategoryIds.length > 0) {
      const currentIds = planogramData.planogram.category_ids || [];
      if (JSON.stringify(selectedCategoryIds.sort()) !== JSON.stringify(currentIds.sort())) {
        updates.category_ids = selectedCategoryIds;
      }
    }

    // Always set preserve_layout to false when regenerating
    updates.preserve_layout = false;

    // Only make request if there are changes
    if (Object.keys(updates).length > 0) {
      const result = await updatePlanogramMutation.mutate(updates);
      if (result.data && result.data.planogram) {
        const updatedPlanogram = result.data.planogram;

        // Update state directly from the response
        if (updatedPlanogram.display?.id) {
          setSelectedDisplay(updatedPlanogram.display.id.toString());
        }
        if (updatedPlanogram.season) {
          setSeason(updatedPlanogram.season);
        }
        // Always update shelf_count, default to 1 if missing
        setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
        if (updatedPlanogram.category_ids) {
          setSelectedCategoryIds(updatedPlanogram.category_ids);
        }

        // Refetch available products after regeneration (in case season or categories changed)
        await fetchAvailableProducts(updatedPlanogram);

        // Refetch to get latest state
        await refetchPlanogram();
      }
    }
  };

  // Handle display change - regenerate planogram immediately
  const handleDisplayChange = async (displayId: string) => {
    setSelectedDisplay(displayId);
    // Trigger regeneration when display changes
    if (planogramData?.planogram) {
      const updates: UpdatePlanogramVariables = {
        display_id: parseInt(displayId, 10),
        preserve_layout: false,
      };
      const result = await updatePlanogramMutation.mutate(updates);
      if (result.data && result.data.planogram) {
        const updatedPlanogram = result.data.planogram;
        // Update shelf count from the new display
        setShelfCount(updatedPlanogram.shelf_count && updatedPlanogram.shelf_count > 0 ? updatedPlanogram.shelf_count : 1);
        await refetchPlanogram();
      }
    }
  };

  return {
    updatePlanogramMutation,
    deleteMutation,
    handleSaveLayout,
    handleSaveName,
    handleCancelEditName,
    handleRegenerate,
    handleDisplayChange,
  };
}
