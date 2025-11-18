import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlanogramFormState {
  name: string;
  isEditingName: boolean;
  selectedDisplay: string;
  season: string;
  shelfCount: number;
  selectedCategoryIds: number[];

  // Actions
  setName: (name: string) => void;
  setIsEditingName: (isEditing: boolean) => void;
  setSelectedDisplay: (display: string) => void;
  setSeason: (season: string) => void;
  setShelfCount: (count: number) => void;
  setSelectedCategoryIds: (ids: number[]) => void;
  toggleCategory: (categoryId: number) => void;
  initializeForm: (data: { name?: string; display_id?: string; season?: string; shelf_count?: number; category_ids?: number[] }) => void;
  resetForm: () => void;
}

export const usePlanogramFormStore = create<PlanogramFormState>()(
  devtools(
    (set) => ({
      // Initial state
      name: '',
      isEditingName: false,
      selectedDisplay: '',
      season: 'summer',
      shelfCount: 1,
      selectedCategoryIds: [],

      // Actions
      setName: (name) => set({ name }, false, 'planogramForm/setName'),
      setIsEditingName: (isEditing) => set({ isEditingName: isEditing }, false, 'planogramForm/setIsEditingName'),
      setSelectedDisplay: (display) => set({ selectedDisplay: display }, false, 'planogramForm/setSelectedDisplay'),
      setSeason: (season) => set({ season }, false, 'planogramForm/setSeason'),
      setShelfCount: (count) => set({ shelfCount: count }, false, 'planogramForm/setShelfCount'),
      setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }, false, 'planogramForm/setSelectedCategoryIds'),
      toggleCategory: (categoryId) =>
        set(
          (state) => ({
            selectedCategoryIds: state.selectedCategoryIds.includes(categoryId) ? state.selectedCategoryIds.filter((id) => id !== categoryId) : [...state.selectedCategoryIds, categoryId],
          }),
          false,
          'planogramForm/toggleCategory'
        ),
      initializeForm: (data) =>
        set(
          (state) => ({
            name: data.name !== undefined ? data.name : state.name,
            selectedDisplay: data.display_id || state.selectedDisplay,
            season: data.season || state.season,
            shelfCount: data.shelf_count && data.shelf_count > 0 ? data.shelf_count : state.shelfCount || 1,
            selectedCategoryIds: data.category_ids || state.selectedCategoryIds,
          }),
          false,
          'planogramForm/initializeForm'
        ),
      resetForm: () =>
        set(
          {
            name: '',
            isEditingName: false,
            selectedDisplay: '',
            season: 'summer',
            shelfCount: 1,
            selectedCategoryIds: [],
          },
          false,
          'planogramForm/resetForm'
        ),
    }),
    { name: 'PlanogramFormStore' }
  )
);
