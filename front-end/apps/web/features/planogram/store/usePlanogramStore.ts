import { create } from 'zustand';

type PlanogramStore = {
  // UI State
  sidebarOpen: boolean;

  // Add Products Sidebar State
  addProductsSidebarOpen: boolean;
  addProductsSidebarExpanded: boolean;
  selectedProducts: Map<number, number>; // productId -> quantity
  targetRowId: number | null;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Add Products Actions
  setAddProductsSidebarOpen: (open: boolean) => void;
  setAddProductsSidebarExpanded: (expanded: boolean) => void;
  toggleAddProductsSidebar: () => void;
  toggleAddProductsSidebarExpand: () => void;
  incrementProduct: (productId: number) => void;
  decrementProduct: (productId: number) => void;
  clearSelectedProducts: () => void;
  setTargetRowId: (rowId: number | null) => void;
  openAddProductsForRow: (rowId: number) => void;
  closeAddProducts: () => void;
};

export const usePlanogramStore = create<PlanogramStore>((set) => ({
  // Initial state
  sidebarOpen: false,

  // Add Products initial state
  addProductsSidebarOpen: false,
  addProductsSidebarExpanded: false,
  selectedProducts: new Map(),
  targetRowId: null,

  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Add Products actions
  setAddProductsSidebarOpen: (open) => set({ addProductsSidebarOpen: open }),
  setAddProductsSidebarExpanded: (expanded) => set({ addProductsSidebarExpanded: expanded }),
  toggleAddProductsSidebar: () =>
    set((state) => ({ addProductsSidebarOpen: !state.addProductsSidebarOpen })),
  toggleAddProductsSidebarExpand: () =>
    set((state) => ({ addProductsSidebarExpanded: !state.addProductsSidebarExpanded })),

  incrementProduct: (productId) =>
    set((state) => {
      const newMap = new Map(state.selectedProducts);
      newMap.set(productId, (newMap.get(productId) || 0) + 1);
      return { selectedProducts: newMap };
    }),
  decrementProduct: (productId) =>
    set((state) => {
      const newMap = new Map(state.selectedProducts);
      const current = newMap.get(productId) || 0;
      if (current <= 1) {
        newMap.delete(productId);
      } else {
        newMap.set(productId, current - 1);
      }
      return { selectedProducts: newMap };
    }),
  clearSelectedProducts: () => set({ selectedProducts: new Map() }),

  setTargetRowId: (rowId) => set({ targetRowId: rowId }),
  openAddProductsForRow: (rowId) =>
    set({
      addProductsSidebarOpen: true,
      targetRowId: rowId,
      selectedProducts: new Map(),
    }),
  closeAddProducts: () =>
    set({
      addProductsSidebarOpen: false,
      selectedProducts: new Map(),
    }),
}));
