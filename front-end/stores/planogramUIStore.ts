import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '@/types/products';

interface PlanogramUIState {
  rowNotifications: Record<number, string>;
  selectedProducts: Product[]; // May be unused, keeping for now

  // Actions
  setRowNotification: (rowId: number, message: string | null) => void;
  clearRowNotifications: () => void;
  setSelectedProducts: (products: Product[]) => void;
}

export const usePlanogramUIStore = create<PlanogramUIState>()(
  devtools(
    (set) => ({
      // Initial state
      rowNotifications: {},
      selectedProducts: [],

      // Actions
      setRowNotification: (rowId, message) =>
        set(
          (state) => {
            const notifications = { ...state.rowNotifications };
            if (message === null) {
              delete notifications[rowId];
            } else {
              notifications[rowId] = message;
            }
            return { rowNotifications: notifications };
          },
          false,
          'planogramUI/setRowNotification'
        ),
      clearRowNotifications: () => set({ rowNotifications: {} }, false, 'planogramUI/clearRowNotifications'),
      setSelectedProducts: (products) => set({ selectedProducts: products }, false, 'planogramUI/setSelectedProducts'),
    }),
    { name: 'PlanogramUIStore' }
  )
);
