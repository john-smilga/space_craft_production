import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { AvailableItem } from '@/types/planograms';
import { usePlanogramSidebarStore } from './planogramSidebarStore';

interface PlanogramAvailableProductsState {
  availableItems: AvailableItem[];
  loadingAvailableItems: boolean;
  selectedAvailableItems: Map<number, number>; // itemId -> quantity
  targetRowId: number | null;

  // Actions
  setAvailableItems: (items: AvailableItem[]) => void;
  setLoadingAvailableItems: (loading: boolean) => void;
  incrementItemQuantity: (itemId: number) => void;
  decrementItemQuantity: (itemId: number) => void;
  setSelectedAvailableItems: (items: Map<number, number>) => void;
  clearSelectedAvailableItems: () => void;
  setTargetRowId: (rowId: number | null) => void;

  // Complex actions
  openAvailableProductsSidebar: (rowId: number) => void;
  closeAvailableProductsSidebar: () => void;
}

export const usePlanogramAvailableProductsStore = create<PlanogramAvailableProductsState>()(
  devtools(
    (set) => ({
      // Initial state
      availableItems: [],
      loadingAvailableItems: false,
      selectedAvailableItems: new Map(),
      targetRowId: null,

      // Actions
      setAvailableItems: (items) => set({ availableItems: items }, false, 'planogramAvailableProducts/setAvailableItems'),
      setLoadingAvailableItems: (loading) => set({ loadingAvailableItems: loading }, false, 'planogramAvailableProducts/setLoadingAvailableItems'),
      incrementItemQuantity: (itemId) =>
        set(
          (state) => {
            const newMap = new Map(state.selectedAvailableItems);
            const currentQty = newMap.get(itemId) || 0;
            newMap.set(itemId, currentQty + 1);
            return { selectedAvailableItems: newMap };
          },
          false,
          'planogramAvailableProducts/incrementItemQuantity'
        ),
      decrementItemQuantity: (itemId) =>
        set(
          (state) => {
            const newMap = new Map(state.selectedAvailableItems);
            const currentQty = newMap.get(itemId) || 0;
            if (currentQty <= 1) {
              newMap.delete(itemId);
            } else {
              newMap.set(itemId, currentQty - 1);
            }
            return { selectedAvailableItems: newMap };
          },
          false,
          'planogramAvailableProducts/decrementItemQuantity'
        ),
      setSelectedAvailableItems: (items) => set({ selectedAvailableItems: items }, false, 'planogramAvailableProducts/setSelectedAvailableItems'),
      clearSelectedAvailableItems: () => set({ selectedAvailableItems: new Map() }, false, 'planogramAvailableProducts/clearSelectedAvailableItems'),
      setTargetRowId: (rowId) => set({ targetRowId: rowId }, false, 'planogramAvailableProducts/setTargetRowId'),

      // Complex actions
      openAvailableProductsSidebar: (rowId) => {
        set({ targetRowId: rowId, selectedAvailableItems: new Map() }, false, 'planogramAvailableProducts/openAvailableProductsSidebar');
        usePlanogramSidebarStore.getState().setAvailableProductsSidebarOpen(true);
      },
      closeAvailableProductsSidebar: () => {
        set({ selectedAvailableItems: new Map() }, false, 'planogramAvailableProducts/closeAvailableProductsSidebar');
        usePlanogramSidebarStore.getState().setAvailableProductsSidebarOpen(false);
      },
    }),
    { name: 'PlanogramAvailableProductsStore' }
  )
);
