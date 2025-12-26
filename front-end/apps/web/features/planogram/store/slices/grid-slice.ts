import type { StateCreator } from 'zustand';
import type { GridResponse, LayoutItem } from '../../types';

export interface GridSlice {
  // Data
  gridData: GridResponse | null;
  rowLayouts: Record<number, LayoutItem[]>;
  
  // UI
  editMode: boolean;
  rowNotifications: Record<number, string>;
  
  // Actions
  setGridData: (data: GridResponse | null) => void;
  setRowLayouts: (layouts: Record<number, LayoutItem[]>) => void;
  updateRowLayout: (rowId: number, items: LayoutItem[]) => void;
  setEditMode: (mode: boolean) => void;
  setRowNotification: (rowId: number, message: string | null) => void;
  clearRowNotifications: () => void;
  initializeFromResponse: (layout: GridResponse) => void;
}

export const createGridSlice: StateCreator<GridSlice> = (set) => ({
  // Initial state
  gridData: null,
  rowLayouts: {},
  editMode: false,
  rowNotifications: {},
  
  // Actions
  setGridData: (data) => set({ gridData: data }),
  setRowLayouts: (layouts) => set({ rowLayouts: layouts }),
  updateRowLayout: (rowId, items) =>
    set((state) => ({
      rowLayouts: { ...state.rowLayouts, [rowId]: items },
    })),
  setEditMode: (mode) => set({ editMode: mode }),
  setRowNotification: (rowId, message) =>
    set((state) => {
      const notifications = { ...state.rowNotifications };
      if (message === null) {
        delete notifications[rowId];
      } else {
        notifications[rowId] = message;
      }
      return { rowNotifications: notifications };
    }),
  clearRowNotifications: () => set({ rowNotifications: {} }),
  initializeFromResponse: (layout) =>
    set({
      gridData: layout,
      rowLayouts: Object.fromEntries(
        layout.rows.map((row) => [row.id, row.items])
      ),
    }),
});

