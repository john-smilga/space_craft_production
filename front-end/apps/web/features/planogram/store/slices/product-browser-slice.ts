import type { StateCreator } from 'zustand';

export interface ProductBrowserSlice {
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  
  setSidebarOpen: (open: boolean) => void;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarExpand: () => void;
}

export const createProductBrowserSlice: StateCreator<ProductBrowserSlice> = (set) => ({
  // Initial state
  sidebarOpen: false,
  sidebarExpanded: false,
  
  // Actions
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleSidebarExpand: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
});

