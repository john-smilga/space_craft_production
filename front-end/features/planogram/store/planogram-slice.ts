import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/zustand/create-selectors';
import type { GridResponse, LayoutItem, AvailableItem, Planogram } from '../types';

interface PlanogramFormState {
  name: string;
  isEditingName: boolean;
  selectedDisplay: string;
  season: string;
  shelfCount: number;
  widthIn: number;
  heightIn: number;
  selectedCategoryIds: number[];
}

interface PlanogramLayoutState {
  gridData: GridResponse | null;
  rowLayouts: Record<number, LayoutItem[]>;
  loading: boolean;
  skipNextInitialization: boolean;
}

interface PlanogramUIState {
  rowNotifications: Record<number, string>;
}

interface PlanogramAvailableProductsState {
  availableItems: AvailableItem[];
  loadingAvailableItems: boolean;
  selectedAvailableItems: Map<number, number>;
  targetRowId: number | null;
}

interface PlanogramSidebarState {
  sidebarOpen: boolean;
  sidebarExpanded: boolean;
  availableProductsSidebarOpen: boolean;
  availableProductsSidebarExpanded: boolean;
}

interface PlanogramDownloadState {
  downloadLoading: boolean;
}

interface PlanogramAIState {
  aiDialogOpen: boolean;
  aiLoading: boolean;
  aiError: string | null;
  aiOverview: string | null;
}

interface PlanogramState
  extends PlanogramFormState,
    PlanogramLayoutState,
    PlanogramUIState,
    PlanogramAvailableProductsState,
    PlanogramSidebarState,
    PlanogramDownloadState,
    PlanogramAIState {
  // Form actions
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

  // Layout actions
  setGridData: (data: GridResponse | null) => void;
  setRowLayouts: (layouts: Record<number, LayoutItem[]>) => void;
  updateRowLayout: (rowId: number, items: LayoutItem[]) => void;
  setLoading: (loading: boolean) => void;
  initializeLayouts: (layout: GridResponse) => void;
  setSkipNextInitialization: (skip: boolean) => void;

  // UI actions
  setRowNotification: (rowId: number, message: string | null) => void;
  clearRowNotifications: () => void;

  // Available Products actions
  setAvailableItems: (items: AvailableItem[]) => void;
  setLoadingAvailableItems: (loading: boolean) => void;
  incrementItemQuantity: (itemId: number) => void;
  decrementItemQuantity: (itemId: number) => void;
  setSelectedAvailableItems: (items: Map<number, number>) => void;
  clearSelectedAvailableItems: () => void;
  setTargetRowId: (rowId: number | null) => void;
  openAvailableProductsSidebar: (rowId: number) => void;
  closeAvailableProductsSidebar: () => void;

  // Sidebar actions
  setSidebarOpen: (open: boolean) => void;
  setSidebarExpanded: (expanded: boolean) => void;
  toggleSidebar: () => void;
  toggleSidebarExpand: () => void;
  setAvailableProductsSidebarOpen: (open: boolean) => void;
  setAvailableProductsSidebarExpanded: (expanded: boolean) => void;
  toggleAvailableProductsSidebar: () => void;
  toggleAvailableProductsSidebarExpand: () => void;

  // Download actions
  setDownloadLoading: (loading: boolean) => void;
  downloadPlanogram: (planogram: Planogram, gridData: GridResponse | null) => Promise<void>;

  // AI actions
  setAIDialogOpen: (open: boolean) => void;
  setAILoading: (loading: boolean) => void;
  setAIError: (error: string | null) => void;
  setAIOverview: (overview: string | null) => void;
  resetAI: () => void;
}

const usePlanogramStoreBase = create<PlanogramState>()(
  devtools(
    (set) => ({
      // Form state
      name: '',
      isEditingName: false,
      selectedDisplay: '',
      season: 'summer',
      shelfCount: 1,
      widthIn: 0,
      heightIn: 0,
      selectedCategoryIds: [],

      // Layout state
      gridData: null,
      rowLayouts: {},
      loading: true,
      skipNextInitialization: false,

      // UI state
      rowNotifications: {},

      // Available Products state
      availableItems: [],
      loadingAvailableItems: false,
      selectedAvailableItems: new Map(),
      targetRowId: null,

      // Sidebar state
      sidebarOpen: false,
      sidebarExpanded: false,
      availableProductsSidebarOpen: false,
      availableProductsSidebarExpanded: false,

      // Download state
      downloadLoading: false,

      // AI state
      aiDialogOpen: false,
      aiLoading: false,
      aiError: null,
      aiOverview: null,

      // Form actions
      setName: (name) => set({ name }, false, 'planogram/setName'),
      setIsEditingName: (isEditing) => set({ isEditingName: isEditing }, false, 'planogram/setIsEditingName'),
      setSelectedDisplay: (display) => set({ selectedDisplay: display }, false, 'planogram/setSelectedDisplay'),
      setSeason: (season) => set({ season }, false, 'planogram/setSeason'),
      setShelfCount: (count) => set({ shelfCount: count }, false, 'planogram/setShelfCount'),
      setWidthIn: (width) => set({ widthIn: width }, false, 'planogram/setWidthIn'),
      setHeightIn: (height) => set({ heightIn: height }, false, 'planogram/setHeightIn'),
      setSelectedCategoryIds: (ids) => set({ selectedCategoryIds: ids }, false, 'planogram/setSelectedCategoryIds'),
      toggleCategory: (categoryId) =>
        set(
          (state) => ({
            selectedCategoryIds: state.selectedCategoryIds.includes(categoryId)
              ? state.selectedCategoryIds.filter((id) => id !== categoryId)
              : [...state.selectedCategoryIds, categoryId],
          }),
          false,
          'planogram/toggleCategory'
        ),
      initializeForm: (data) =>
        set(
          (state) => ({
            name: data.name !== undefined ? data.name : state.name,
            selectedDisplay: data.display_id || state.selectedDisplay,
            season: data.season || state.season,
            shelfCount: data.shelf_count && data.shelf_count > 0 ? data.shelf_count : state.shelfCount || 1,
            widthIn: data.width_in || state.widthIn,
            heightIn: data.height_in || state.heightIn,
            selectedCategoryIds: data.category_ids || state.selectedCategoryIds,
          }),
          false,
          'planogram/initializeForm'
        ),
      resetForm: () =>
        set(
          {
            name: '',
            isEditingName: false,
            selectedDisplay: '',
            season: 'summer',
            shelfCount: 1,
            widthIn: 0,
            heightIn: 0,
            selectedCategoryIds: [],
          },
          false,
          'planogram/resetForm'
        ),

      // Layout actions
      setGridData: (data) => set({ gridData: data }, false, 'planogram/setGridData'),
      setRowLayouts: (layouts) => set({ rowLayouts: layouts }, false, 'planogram/setRowLayouts'),
      updateRowLayout: (rowId, items) =>
        set(
          (state) => ({
            rowLayouts: {
              ...state.rowLayouts,
              [rowId]: items,
            },
          }),
          false,
          'planogram/updateRowLayout'
        ),
      setLoading: (loading) => set({ loading }, false, 'planogram/setLoading'),
      setSkipNextInitialization: (skip) => set({ skipNextInitialization: skip }, false, 'planogram/setSkipNextInitialization'),
      initializeLayouts: (layout) =>
        set(
          (state) => {
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
                  category: '',
                  score: 0,
                  pack_width_in: 0,
                  pack_height_in: 0,
                },
              }));
            });
            return { gridData: layout, rowLayouts: layouts, loading: false };
          },
          false,
          'planogram/initializeLayouts'
        ),

      // UI actions
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
          'planogram/setRowNotification'
        ),
      clearRowNotifications: () => set({ rowNotifications: {} }, false, 'planogram/clearRowNotifications'),

      // Available Products actions
      setAvailableItems: (items) => set({ availableItems: items }, false, 'planogram/setAvailableItems'),
      setLoadingAvailableItems: (loading) => set({ loadingAvailableItems: loading }, false, 'planogram/setLoadingAvailableItems'),
      incrementItemQuantity: (itemId) =>
        set(
          (state) => {
            const newMap = new Map(state.selectedAvailableItems);
            const currentQty = newMap.get(itemId) || 0;
            newMap.set(itemId, currentQty + 1);
            return { selectedAvailableItems: newMap };
          },
          false,
          'planogram/incrementItemQuantity'
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
          'planogram/decrementItemQuantity'
        ),
      setSelectedAvailableItems: (items) => set({ selectedAvailableItems: items }, false, 'planogram/setSelectedAvailableItems'),
      clearSelectedAvailableItems: () => set({ selectedAvailableItems: new Map() }, false, 'planogram/clearSelectedAvailableItems'),
      setTargetRowId: (rowId) => set({ targetRowId: rowId }, false, 'planogram/setTargetRowId'),
      openAvailableProductsSidebar: (rowId) => {
        set(
          {
            targetRowId: rowId,
            selectedAvailableItems: new Map(),
            availableProductsSidebarOpen: true,
          },
          false,
          'planogram/openAvailableProductsSidebar'
        );
      },
      closeAvailableProductsSidebar: () => {
        set(
          {
            selectedAvailableItems: new Map(),
            availableProductsSidebarOpen: false,
          },
          false,
          'planogram/closeAvailableProductsSidebar'
        );
      },

      // Sidebar actions
      setSidebarOpen: (open) => set({ sidebarOpen: open }, false, 'planogram/setSidebarOpen'),
      setSidebarExpanded: (expanded) => set({ sidebarExpanded: expanded }, false, 'planogram/setSidebarExpanded'),
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'planogram/toggleSidebar'),
      toggleSidebarExpand: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded }), false, 'planogram/toggleSidebarExpand'),
      setAvailableProductsSidebarOpen: (open) => set({ availableProductsSidebarOpen: open }, false, 'planogram/setAvailableProductsSidebarOpen'),
      setAvailableProductsSidebarExpanded: (expanded) =>
        set({ availableProductsSidebarExpanded: expanded }, false, 'planogram/setAvailableProductsSidebarExpanded'),
      toggleAvailableProductsSidebar: () =>
        set((state) => ({ availableProductsSidebarOpen: !state.availableProductsSidebarOpen }), false, 'planogram/toggleAvailableProductsSidebar'),
      toggleAvailableProductsSidebarExpand: () =>
        set((state) => ({ availableProductsSidebarExpanded: !state.availableProductsSidebarExpanded }), false, 'planogram/toggleAvailableProductsSidebarExpand'),

      // Download actions
      setDownloadLoading: (loading) => set({ downloadLoading: loading }, false, 'planogram/setDownloadLoading'),
      downloadPlanogram: async (planogram, gridData) => {
        set({ downloadLoading: true }, false, 'planogram/downloadStart');

        try {
          const { generatePlanogramCSV } = await import('@/lib/planogramCSV');
          const csvContent = generatePlanogramCSV(planogram, gridData);

          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const dateStr = new Date().toISOString().split('T')[0];
          a.download = `${planogram.name.replace(/[^a-z0-9]/gi, '_')}-${dateStr}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          const toast = (await import('react-hot-toast')).default;
          toast.success('Planogram downloaded successfully');
        } catch {
          const toast = (await import('react-hot-toast')).default;
          toast.error('Failed to download planogram');
        } finally {
          set({ downloadLoading: false }, false, 'planogram/downloadComplete');
        }
      },

      // AI actions
      setAIDialogOpen: (open) => set({ aiDialogOpen: open }, false, 'planogram/setAIDialogOpen'),
      setAILoading: (loading) => set({ aiLoading: loading }, false, 'planogram/setAILoading'),
      setAIError: (error) => set({ aiError: error }, false, 'planogram/setAIError'),
      setAIOverview: (overview) => set({ aiOverview: overview }, false, 'planogram/setAIOverview'),
      resetAI: () => set({ aiLoading: false, aiError: null, aiOverview: null }, false, 'planogram/resetAI'),
    }),
    { name: 'PlanogramStore' }
  )
);

export const usePlanogramStore = createSelectors(usePlanogramStoreBase);

