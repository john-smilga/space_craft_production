import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { GridResponse, LayoutItem } from '@/types/planograms';

interface PlanogramLayoutState {
  gridData: GridResponse | null;
  rowLayouts: Record<number, LayoutItem[]>;
  loading: boolean;
  skipNextInitialization: boolean;

  // Actions
  setGridData: (data: GridResponse | null) => void;
  setRowLayouts: (layouts: Record<number, LayoutItem[]>) => void;
  updateRowLayout: (rowId: number, items: LayoutItem[]) => void;
  setLoading: (loading: boolean) => void;
  initializeLayouts: (layout: GridResponse) => void;
  setSkipNextInitialization: (skip: boolean) => void;
}

export const usePlanogramLayoutStore = create<PlanogramLayoutState>()(
  devtools(
    (set) => ({
      // Initial state
      gridData: null,
      rowLayouts: {},
      loading: true,
      skipNextInitialization: false,

      // Actions
      setGridData: (data) => set({ gridData: data }, false, 'planogramLayout/setGridData'),
      setRowLayouts: (layouts) => set({ rowLayouts: layouts }, false, 'planogramLayout/setRowLayouts'),
      updateRowLayout: (rowId, items) =>
        set(
          (state) => ({
            rowLayouts: {
              ...state.rowLayouts,
              [rowId]: items,
            },
          }),
          false,
          'planogramLayout/updateRowLayout'
        ),
      setLoading: (loading) => set({ loading }, false, 'planogramLayout/setLoading'),
      setSkipNextInitialization: (skip) => set({ skipNextInitialization: skip }, false, 'planogramLayout/setSkipNextInitialization'),
      initializeLayouts: (layout) =>
        set(
          (state) => {
            // Skip initialization if flag is set (prevents flashing after saving layout)
            if (state.skipNextInitialization) {
              return { skipNextInitialization: false };
            }

            const layouts: Record<number, LayoutItem[]> = {};
            layout.rows.forEach((row) => {
              layouts[row.id] = row.items.map((item) => ({
                ...item,
                meta: item.meta || {
                  id: parseInt(item.i),
                  name: 'Unknown',
                  category: null,
                  score: 0,
                  pack_width_in: 0,
                  pack_height_in: 0,
                },
              }));
            });
            return { gridData: layout, rowLayouts: layouts, loading: false };
          },
          false,
          'planogramLayout/initializeLayouts'
        ),
    }),
    { name: 'PlanogramLayoutStore' }
  )
);
