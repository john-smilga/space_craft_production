import type { StateCreator } from 'zustand';

export interface FormSlice {
  // Form state
  name: string;
  isEditingName: boolean;
  selectedDisplay: string;
  season: string;
  shelfCount: number;
  widthIn: number;
  heightIn: number;
  selectedCategoryIds: number[];
  
  // Actions
  setName: (name: string) => void;
  setIsEditingName: (isEditing: boolean) => void;
  setSelectedDisplay: (display: string) => void;
  setSeason: (season: string) => void;
  setShelfCount: (count: number) => void;
  setWidthIn: (width: number) => void;
  setHeightIn: (height: number) => void;
  setSelectedCategoryIds: (ids: number[]) => void;
  toggleCategory: (categoryId: number) => void;
  initializeForm: (data: {
    name?: string;
    display_id?: string;
    season?: string;
    shelf_count?: number;
    width_in?: number;
    height_in?: number;
    category_ids?: number[];
  }) => void;
  resetForm: () => void;
}

export const createFormSlice: StateCreator<FormSlice> = (set) => ({
  // Initial state
  name: '',
  isEditingName: false,
  selectedDisplay: '',
  season: 'summer',
  shelfCount: 1,
  widthIn: 0,
  heightIn: 0,
  selectedCategoryIds: [],
  
  // Actions
  setName: (name) => set({ name }),
  setIsEditingName: (isEditing) => set({ isEditingName: isEditing }),
  setSelectedDisplay: (display) => set({ selectedDisplay: display }),
  setSeason: (season) => set({ season }),
  setShelfCount: (count) => set({ shelfCount: count }),
  setWidthIn: (width) => set({ widthIn: width }),
  setHeightIn: (height) => set({ heightIn: height }),
  setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }),
  toggleCategory: (categoryId) =>
    set((state) => ({
      selectedCategoryIds: state.selectedCategoryIds.includes(categoryId)
        ? state.selectedCategoryIds.filter((id) => id !== categoryId)
        : [...state.selectedCategoryIds, categoryId],
    })),
  initializeForm: (data) =>
    set((state) => ({
      name: data.name !== undefined ? data.name : state.name,
      selectedDisplay: data.display_id || state.selectedDisplay,
      season: data.season || state.season,
      shelfCount: data.shelf_count && data.shelf_count > 0 ? data.shelf_count : state.shelfCount || 1,
      widthIn: data.width_in || state.widthIn,
      heightIn: data.height_in || state.heightIn,
      selectedCategoryIds: data.category_ids || state.selectedCategoryIds,
    })),
  resetForm: () =>
    set({
      name: '',
      isEditingName: false,
      selectedDisplay: '',
      season: 'summer',
      shelfCount: 1,
      widthIn: 0,
      heightIn: 0,
      selectedCategoryIds: [],
    }),
});

