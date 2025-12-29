import type { StateCreator } from 'zustand';

export type AvailableProductsSlice = {
  // Sidebar UI
  availableProductsSidebarOpen: boolean;
  availableProductsSidebarExpanded: boolean;

  // Selection
  selectedItems: Map<number, number>; // itemId -> quantity
  targetRowId: number | null;

  // Actions
  setAvailableProductsSidebarOpen: (open: boolean) => void;
  setAvailableProductsSidebarExpanded: (expanded: boolean) => void;
  toggleAvailableProductsSidebar: () => void;
  toggleAvailableProductsSidebarExpand: () => void;

  incrementItem: (itemId: number) => void;
  decrementItem: (itemId: number) => void;
  clearSelectedItems: () => void;

  setTargetRowId: (rowId: number | null) => void;
  openAvailableProductsForRow: (rowId: number) => void;
  closeAvailableProducts: () => void;
}

export const createAvailableProductsSlice: StateCreator<AvailableProductsSlice> = (set) => ({
  // Initial state
  availableProductsSidebarOpen: false,
  availableProductsSidebarExpanded: false,
  selectedItems: new Map(),
  targetRowId: null,
  
  // Actions
  setAvailableProductsSidebarOpen: (open) => set({ availableProductsSidebarOpen: open }),
  setAvailableProductsSidebarExpanded: (expanded) => set({ availableProductsSidebarExpanded: expanded }),
  toggleAvailableProductsSidebar: () => 
    set((state) => ({ availableProductsSidebarOpen: !state.availableProductsSidebarOpen })),
  toggleAvailableProductsSidebarExpand: () => 
    set((state) => ({ availableProductsSidebarExpanded: !state.availableProductsSidebarExpanded })),
  
  incrementItem: (itemId) =>
    set((state) => {
      const newMap = new Map(state.selectedItems);
      newMap.set(itemId, (newMap.get(itemId) || 0) + 1);
      return { selectedItems: newMap };
    }),
  decrementItem: (itemId) =>
    set((state) => {
      const newMap = new Map(state.selectedItems);
      const current = newMap.get(itemId) || 0;
      if (current <= 1) {
        newMap.delete(itemId);
      } else {
        newMap.set(itemId, current - 1);
      }
      return { selectedItems: newMap };
    }),
  clearSelectedItems: () => set({ selectedItems: new Map() }),
  
  setTargetRowId: (rowId) => set({ targetRowId: rowId }),
  openAvailableProductsForRow: (rowId) =>
    set({
      availableProductsSidebarOpen: true,
      targetRowId: rowId,
      selectedItems: new Map(),
    }),
  closeAvailableProducts: () =>
    set({
      availableProductsSidebarOpen: false,
      selectedItems: new Map(),
    }),
});

