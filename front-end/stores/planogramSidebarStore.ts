import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlanogramSidebarState {
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  availableProductsSidebarOpen: boolean;
  availableProductsSidebarExpanded: boolean;

  // Actions
  setSidebarOpen: (open: boolean) => void;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarExpand: () => void;
  setAvailableProductsSidebarOpen: (open: boolean) => void;
  setAvailableProductsSidebarExpanded: (expanded: boolean) => void;
  toggleAvailableProductsSidebar: () => void;
  toggleAvailableProductsSidebarExpand: () => void;
}

export const usePlanogramSidebarStore = create<PlanogramSidebarState>()(
  devtools(
    (set) => ({
      // Initial state
      sidebarOpen: false,
      sidebarExpanded: false,
      availableProductsSidebarOpen: false,
      availableProductsSidebarExpanded: false,

      // Actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'planogramSidebar/setSidebarOpen'),
      setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }, false, 'planogramSidebar/setSidebarExpanded'),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'planogramSidebar/toggleSidebar'),
      toggleSidebarExpand: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded }), false, 'planogramSidebar/toggleSidebarExpand'),
      setAvailableProductsSidebarOpen: (open) => set({ availableProductsSidebarOpen: open }, false, 'planogramSidebar/setAvailableProductsSidebarOpen'),
      setAvailableProductsSidebarExpanded: (expanded) => set({ availableProductsSidebarExpanded: expanded }, false, 'planogramSidebar/setAvailableProductsSidebarExpanded'),
      toggleAvailableProductsSidebar: () => set((state) => ({ availableProductsSidebarOpen: !state.availableProductsSidebarOpen }), false, 'planogramSidebar/toggleAvailableProductsSidebar'),
      toggleAvailableProductsSidebarExpand: () => set((state) => ({ availableProductsSidebarExpanded: !state.availableProductsSidebarExpanded }), false, 'planogramSidebar/toggleAvailableProductsSidebarExpand'),
    }),
    { name: 'PlanogramSidebarStore' }
  )
);
