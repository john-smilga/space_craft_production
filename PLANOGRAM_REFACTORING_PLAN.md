# Planogram Architecture Refactoring Plan

## Current Problems

The planogram feature has become overly complex:
- **390-line monolithic Zustand store** (`front-end/features/planogram/store/planogram-slice.ts`) managing 7 different state groups
- **Double state management**: React Query caches data, then copied into Zustand, causing sync issues
- **4 custom hooks** orchestrating complex state updates
- **Circular data flow**: Fetch → Initialize Zustand → Mutate → Refetch → Re-initialize Zustand

## New Architecture

### One Store with Separate Slices (Best of Both Worlds!)

**Store Structure:**
```
store/
├── slices/
│   ├── grid-slice.ts
│   ├── available-products-slice.ts
│   ├── product-browser-slice.ts
│   └── ai-slice.ts
└── index.ts (combines all slices into one store)
```

**Slices:**

1. **Grid Slice** (`grid-slice.ts`)
   - gridData: GridResponse | null
   - rowLayouts: Record<number, LayoutItem[]>
   - editMode: boolean
   - rowNotifications: Record<number, string>

2. **Available Products Slice** (`available-products-slice.ts`)
   - availableProductsSidebarOpen: boolean
   - availableProductsSidebarExpanded: boolean  
   - selectedItems: Map<number, number> (item ID → quantity)
   - targetRowId: number | null

3. **Product Browser Slice** (`product-browser-slice.ts`)
   - sidebarOpen: boolean
   - sidebarExpanded: boolean

4. **AI Slice** (`ai-slice.ts`)
   - aiDialogOpen: boolean
   - aiLoading: boolean
   - aiError: string | null
   - aiOverview: string | null

**Benefits:**
- ✅ Separate files (organized, maintainable)
- ✅ One combined store (easy cross-slice access)
- ✅ Clean imports (one `usePlanogramStore` hook for everything)
- ✅ No duplicate store state
- ✅ Cross-slice operations are simple (no multiple store imports needed)
- ✅ Type-safe (TypeScript automatically combines slice types)

**Example: Cross-Slice Operation**
```typescript
// Easy! All in one store
const addItemsToGrid = () => {
  const { selectedItems, updateRowLayout, closeAvailableProducts } = 
    usePlanogramStore.getState();
  
  updateRowLayout(rowId, [...items, ...selectedItems]);
  closeAvailableProducts();
};

// vs. Multiple separate stores (more imports, more verbose)
const addItemsToGrid = () => {
  const items = useAvailableProductsStore.getState().selectedItems;
  useGridStore.getState().updateRowLayout(rowId, [...items]);
  useAvailableProductsStore.getState().close();
};
```

### Simplified Data Flow

```
Form Flow:
  Form Input → Update Mutation → Backend → React Query refetch → Form Display

Grid Flow:
  Grid Zustand Store → Local edits → Grid Component
  Grid Component → Save button → Save Layout Mutation → Backend
  Backend → React Query refetch → Initialize Grid Store once

Products Flow:
  Form (categories + season) → Fetch Products Query → Available Products Store
  Available Products Store → Add items → Grid Store
```

## Implementation Steps

### Step 1: Create Store Slices (Separate Files, Combined Store)

#### File: `front-end/features/planogram/store/slices/grid-slice.ts` (new)

```typescript
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
```

#### File: `front-end/features/planogram/store/slices/available-products-slice.ts` (new)

```typescript
import type { StateCreator } from 'zustand';

export interface AvailableProductsSlice {
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
```

#### File: `front-end/features/planogram/store/slices/product-browser-slice.ts` (new)

```typescript
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
```

#### File: `front-end/features/planogram/store/slices/ai-slice.ts` (new)

```typescript
import type { StateCreator } from 'zustand';

export interface AISlice {
  aiDialogOpen: boolean;
  aiLoading: boolean;
  aiError: string | null;
  aiOverview: string | null;
  
  setAIDialogOpen: (open: boolean) => void;
  setAILoading: (loading: boolean) => void;
  setAIError: (error: string | null) => void;
  setAIOverview: (overview: string | null) => void;
  resetAI: () => void;
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
  // Initial state
  aiDialogOpen: false,
  aiLoading: false,
  aiError: null,
  aiOverview: null,
  
  // Actions
  setAIDialogOpen: (open) => set({ aiDialogOpen: open }),
  setAILoading: (loading) => set({ aiLoading: loading }),
  setAIError: (error) => set({ aiError: error }),
  setAIOverview: (overview) => set({ aiOverview: overview }),
  resetAI: () => set({ aiLoading: false, aiError: null, aiOverview: null }),
});
```

#### File: `front-end/features/planogram/store/index.ts` (new - combines all slices)

```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/zustand/create-selectors';
import { createGridSlice, type GridSlice } from './slices/grid-slice';
import { createAvailableProductsSlice, type AvailableProductsSlice } from './slices/available-products-slice';
import { createProductBrowserSlice, type ProductBrowserSlice } from './slices/product-browser-slice';
import { createAISlice, type AISlice } from './slices/ai-slice';

// Combined store type
type PlanogramStore = GridSlice & AvailableProductsSlice & ProductBrowserSlice & AISlice;

// Create the combined store
const usePlanogramStoreBase = create<PlanogramStore>()(
  devtools(
    (...args) => ({
      ...createGridSlice(...args),
      ...createAvailableProductsSlice(...args),
      ...createProductBrowserSlice(...args),
      ...createAISlice(...args),
    }),
    { name: 'PlanogramStore' }
  )
);

// Export with selectors
export const usePlanogramStore = createSelectors(usePlanogramStoreBase);

// Export types
export type { PlanogramStore, GridSlice, AvailableProductsSlice, ProductBrowserSlice, AISlice };
```

**Usage Example:**

```typescript
// One import for everything!
import { usePlanogramStore } from '@/features/planogram/store';

// Access any slice
const gridData = usePlanogramStore.use.gridData();
const selectedItems = usePlanogramStore.use.selectedItems();
const sidebarOpen = usePlanogramStore.use.availableProductsSidebarOpen();

// Cross-slice operations are easy
const addToGrid = () => {
  const store = usePlanogramStore.getState();
  const items = store.selectedItems;
  store.updateRowLayout(rowId, [...store.rowLayouts[rowId], ...items]);
  store.closeAvailableProducts();
};
```

---

### Step 2: Simplify usePlanogramData Hook

#### File: `front-end/features/planogram/hooks/use-planogram-data.ts` (simplify)

Remove Zustand initialization logic. Just fetch data:

```typescript
'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import type { PlanogramDetailResponse } from '../types';
import { useStandardDisplaysQuery, useDisplaysQuery } from '@/features/displays';
import { schemas } from '@/lib/generated/api-schemas';

// Schema for layout item structure
const LayoutItemSchema = z.object({
  i: z.string(),
  x: z.number(),
  y: z.number(),
  w: z.number(),
  h: z.number(),
  meta: z.object({
    id: z.number(),
    name: z.string(),
    category: z.string(),
    color: z.string().optional(),
    score: z.number(),
    pack_width_in: z.number(),
    pack_height_in: z.number(),
  }),
});

const GridResponseSchema = z.object({
  grid: z.object({
    cols: z.number(),
    rows: z.number(),
    cellWidthIn: z.number(),
  }),
  rows: z.array(
    z.object({
      id: z.number(),
      category: z.string().nullable(),
      name: z.string(),
      items: z.array(LayoutItemSchema),
    })
  ),
});

const PlanogramDetailResponseSchema = schemas.Planogram.extend({
  layout: GridResponseSchema.optional(),
});

export function usePlanogramData(planogramSlug: string | null) {
  // Fetch planogram data
  const planogramQuery = useQuery({
    queryKey: ['planograms', planogramSlug],
    queryFn: async (): Promise<PlanogramDetailResponse> => {
      if (!planogramSlug) {
        throw new Error('Planogram slug is required');
      }
      const { data } = await api.get(`/planograms/${planogramSlug}/`);
      const validated = PlanogramDetailResponseSchema.parse(data);
      const { layout, ...planogramData } = validated;
      return {
        planogram: planogramData,
        layout,
      };
    },
    enabled: !!planogramSlug,
    staleTime: 1000 * 60 * 5,
  });

  // Fetch company displays
  const { data: companyDisplays = [] } = useDisplaysQuery();

  // Fetch standard displays
  const { data: standardsData } = useStandardDisplaysQuery();
  const standardDisplays = standardsData?.standards || [];

  // Fetch leaf categories
  const leafCategoriesQuery = useQuery({
    queryKey: ['categories', 'leaf'],
    queryFn: async () => {
      const { data } = await api.get('/categories/leaf/');
      return data;
    },
  });

  return {
    planogram: planogramQuery.data?.planogram,
    layout: planogramQuery.data?.layout,
    isLoading: planogramQuery.isLoading,
    refetch: planogramQuery.refetch,
    companyDisplays,
    standardDisplays,
    leafCategories: leafCategoriesQuery.data?.categories || [],
  };
}
```

---

### Step 3: Create useAvailableProducts Hook

#### File: `front-end/features/planogram/hooks/use-available-products.ts` (new)

Fetch products based on planogram categories and season:

```typescript
'use client';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import { schemas } from '@/lib/generated/api-schemas';
import type { AvailableItem } from '../types';

export function useAvailableProducts(
  categoryIds: number[],
  season: string,
  enabled: boolean = true
) {
  return useQuery({
    queryKey: ['available-products', categoryIds, season],
    queryFn: async (): Promise<AvailableItem[]> => {
      if (categoryIds.length === 0) {
        return [];
      }

      const categoryIdsStr = categoryIds.join(',');
      const response = await api.get(
        `/products/by-categories/?category_ids=${categoryIdsStr}&season=${season}`
      );

      const validated = schemas.ProductListResponse.parse(response.data);
      const products = validated.products || [];

      return products.map((product) => ({
        id: product.id,
        name: product.name,
        category: product.category ?? 'Unknown',
        color: product.color ?? '#9ca3af',
        score: product.overall_score,
        margin: product.margin,
        pack_width_in: product.pack_width_in,
        pack_height_in: product.pack_height_in,
      }));
    },
    enabled: enabled && categoryIds.length > 0,
  });
}
```

---

### Step 4: Simplify Form Components

Form components read directly from React Query data, no Zustand needed.

#### File: `front-end/features/planogram/components/planogram-form-fields/planogram-form-fields.tsx` (update)

Use controlled inputs with local state, sync on change:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { usePlanogramData } from '@/features/planogram/hooks';
import { useUpdatePlanogramMutation } from '@/features/planogram/queries';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
// ... other imports

const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;

export function PlanogramFormFields() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  
  const { planogram, companyDisplays, standardDisplays } = usePlanogramData(planogramSlug);
  const updateMutation = useUpdatePlanogramMutation();
  
  // Local form state
  const [season, setSeason] = useState(planogram?.season || 'summer');
  const [shelfCount, setShelfCount] = useState(planogram?.shelf_count || 1);
  const [categoryIds, setCategoryIds] = useState<number[]>(
    planogram?.category_ids || []
  );
  
  // Sync with server data when it changes
  useEffect(() => {
    if (planogram) {
      setSeason(planogram.season);
      setShelfCount(planogram.shelf_count);
      setCategoryIds(planogram.category_ids || []);
    }
  }, [planogram?.id]);
  
  const handleRegenerate = async () => {
    if (!planogram) return;
    
    await updateMutation.mutateAsync({
      slug: planogramSlug,
      name: planogram.name,
      width_in: planogram.width_in,
      height_in: planogram.height_in,
      season,
      shelf_count: shelfCount,
      category_ids: categoryIds,
      preserve_layout: false, // Regenerate
    });
  };
  
  return (
    <div className='space-y-4'>
      {/* Display (read-only after creation) */}
      <div>
        <Label>Display</Label>
        <div className='px-3 py-2 bg-muted border rounded-lg'>
          {/* Find display name from companyDisplays or standardDisplays */}
          {planogram?.display}
        </div>
      </div>
      
      {/* Season */}
      <div>
        <Label>Season</Label>
        <RadioGroup value={season} onValueChange={setSeason} className='flex gap-4'>
          {SEASONS.map((s) => (
            <div key={s} className='flex items-center space-x-2'>
              <RadioGroupItem value={s} id={s} />
              <label htmlFor={s} className='capitalize cursor-pointer'>
                {s}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Shelf Count */}
      <div>
        <Label>Shelf Count</Label>
        <input
          type='number'
          value={shelfCount}
          onChange={(e) => setShelfCount(parseInt(e.target.value))}
          min={1}
          className='w-full px-3 py-2 border rounded-lg'
        />
      </div>
      
      {/* Categories */}
      <div>
        <Label>Categories</Label>
        {/* Category selector component */}
      </div>
      
      {/* Regenerate Button */}
      <Button
        onClick={handleRegenerate}
        disabled={updateMutation.isPending}
      >
        {updateMutation.isPending ? 'Regenerating...' : 'Regenerate Layout'}
      </Button>
    </div>
  );
}
```

---

### Step 5: Update Grid Component

#### File: `front-end/features/planogram/components/grid/grid.tsx` (update)

Use the new grid store:

```typescript
'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useGridStore, useAvailableProductsStore } from '@/features/planogram/store';
import { usePlanogramData } from '@/features/planogram/hooks';
import { useSaveLayoutMutation } from '@/features/planogram/queries';
import { useGridActions } from '@/features/planogram/hooks';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import 'react-grid-layout/css/styles.css';

const GridLayoutWithProvider = WidthProvider(GridLayout);

export function Grid() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  
  // React Query data
  const { layout } = usePlanogramData(planogramSlug);
  
  // Planogram store (one import for all slices!)
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const editMode = usePlanogramStore.use.editMode();
  const setEditMode = usePlanogramStore.use.setEditMode();
  const initializeFromResponse = usePlanogramStore.use.initializeFromResponse();
  const updateRowLayout = usePlanogramStore.use.updateRowLayout();
  const openAvailableProductsForRow = usePlanogramStore.use.openAvailableProductsForRow();
  
  // Save mutation
  const saveLayoutMutation = useSaveLayoutMutation();
  
  // Grid actions hook
  const { handleLayoutChange } = useGridActions({
    gridData,
    rowLayouts,
    updateRowLayout,
  });
  
  // Initialize grid from layout data (only once)
  useEffect(() => {
    if (layout && !gridData) {
      initializeFromResponse(layout);
    }
  }, [layout?.grid.cols]); // Use a stable reference
  
  const handleSave = async () => {
    await saveLayoutMutation.mutateAsync({
      slug: planogramSlug,
      layout: rowLayouts,
      preserve_layout: true,
    });
    setEditMode(false);
  };
  
  const handleAddItems = () => {
    if (gridData?.rows.length > 0) {
      openAvailableProductsForRow(gridData.rows[0].id);
    }
  };
  
  const handleItemDelete = (rowId: number, itemId: string) => {
    const currentLayout = rowLayouts[rowId] || [];
    updateRowLayout(rowId, currentLayout.filter((item) => item.i !== itemId));
  };
  
  if (!gridData) {
    return <div>Loading grid...</div>;
  }
  
  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Shelf Layout</h2>
        <div className='flex items-center gap-2'>
          {!editMode ? (
            <Button onClick={() => setEditMode(true)} size='sm' variant='outline'>
              Edit Mode
            </Button>
          ) : (
            <>
              <Button onClick={handleAddItems} size='sm' variant='outline'>
                Add Items
              </Button>
              <Button onClick={handleSave} size='sm'>
                Save Layout
              </Button>
            </>
          )}
        </div>
      </div>
      
      {gridData.rows.map((row) => {
        const currentLayout = rowLayouts[row.id] || row.items;
        return (
          <div key={row.id} className='mb-6'>
            <GridLayoutWithProvider
              className='layout border-2 border-border bg-muted rounded'
              layout={currentLayout}
              onLayoutChange={(newLayout) => {
                if (editMode) {
                  handleLayoutChange(row.id, newLayout);
                }
              }}
              cols={gridData.grid.cols}
              rowHeight={100}
              isResizable={false}
              isDraggable={editMode}
              margin={[4, 4]}
            >
              {currentLayout.map((item) => (
                <div
                  key={item.i}
                  className='border-2 rounded p-2 flex flex-col items-center justify-center text-sm text-center font-bold text-white'
                  style={{ backgroundColor: item.meta.color }}
                >
                  <div className='flex-1 flex items-center justify-center'>
                    {item.meta.name}
                  </div>
                  {editMode && (
                    <button
                      onClick={() => handleItemDelete(row.id, item.i)}
                      className='absolute top-1 right-1 bg-white/90 text-black rounded w-5 h-5 flex items-center justify-center'
                    >
                      <X className='h-4 w-4' />
                    </button>
                  )}
                </div>
              ))}
            </GridLayoutWithProvider>
          </div>
        );
      })}
    </div>
  );
}
```

---

### Step 6: Update Available Products Sidebar

#### File: `front-end/features/planogram/components/available-products-sidebar/available-products-sidebar.tsx` (update)

Use new stores + React Query:

```typescript
'use client';

import { useParams } from 'next/navigation';
import { useAvailableProductsStore, useGridStore } from '@/features/planogram/store';
import { usePlanogramData, useAvailableProducts } from '@/features/planogram/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export function AvailableProductsSidebar() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  
  // Get planogram data for categories/season
  const { planogram } = usePlanogramData(planogramSlug);
  
  // Fetch available products based on planogram categories/season
  const { data: products = [], isLoading } = useAvailableProducts(
    planogram?.category_ids || [],
    planogram?.season || 'summer',
    planogram !== undefined // Only fetch when we have planogram data
  );
  
  // Planogram store (one import for all slices!)
  const sidebarOpen = usePlanogramStore.use.availableProductsSidebarOpen();
  const sidebarExpanded = usePlanogramStore.use.availableProductsSidebarExpanded();
  const selectedItems = usePlanogramStore.use.selectedItems();
  const targetRowId = usePlanogramStore.use.targetRowId();
  const incrementItem = usePlanogramStore.use.incrementItem();
  const decrementItem = usePlanogramStore.use.decrementItem();
  const closeAvailableProducts = usePlanogramStore.use.closeAvailableProducts();
  const toggleExpanded = usePlanogramStore.use.toggleAvailableProductsSidebarExpand();
  
  // Grid data from same store (easy cross-slice access!)
  const updateRowLayout = usePlanogramStore.use.updateRowLayout();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const gridData = usePlanogramStore.use.gridData();
  
  const handleAddToGrid = () => {
    if (!gridData || targetRowId === null) return;
    
    const currentLayout = rowLayouts[targetRowId] || [];
    const newItems = [];
    
    // Convert selected items to layout items
    selectedItems.forEach((quantity, itemId) => {
      const product = products.find((p) => p.id === itemId);
      if (!product) return;
      
      for (let i = 0; i < quantity; i++) {
        // Calculate width in cells
        const itemWidth = calculateWidth(product.pack_width_in, gridData.grid.cellWidthIn);
        
        // Find rightmost position
        const rightmostX = currentLayout.length > 0
          ? Math.max(...currentLayout.map((item) => item.x + item.w))
          : 0;
        
        newItems.push({
          i: `${itemId}-${Date.now()}-${i}`,
          x: rightmostX + i * itemWidth,
          y: 0,
          w: itemWidth,
          h: 1,
          meta: {
            id: product.id,
            name: product.name,
            category: product.category,
            color: product.color,
            score: product.score,
            pack_width_in: product.pack_width_in,
            pack_height_in: product.pack_height_in,
          },
        });
      }
    });
    
    updateRowLayout(targetRowId, [...currentLayout, ...newItems]);
    closeAvailableProducts();
  };
  
  if (!sidebarOpen) return null;
  
  return (
    <div className={`fixed right-0 top-0 h-screen z-40 ${sidebarExpanded ? 'w-xl' : 'w-96'} bg-card border-l`}>
      <Card className='h-full rounded-none'>
        <CardHeader>
          <div className='flex items-center justify-between'>
            <CardTitle>Available Products</CardTitle>
            <Button variant='ghost' size='icon' onClick={close}>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading && <div>Loading products...</div>}
          
          {!isLoading && products.length === 0 && (
            <div>No products available for selected categories</div>
          )}
          
          {!isLoading && products.length > 0 && (
            <div className='space-y-4'>
              {products.map((product) => (
                <div key={product.id} className='p-3 border rounded'>
                  <div className='font-medium'>{product.name}</div>
                  <div className='text-sm text-muted-foreground'>
                    {product.category}
                  </div>
                  <div className='flex items-center gap-2 mt-2'>
                    <Button
                      size='sm'
                      onClick={() => decrementItem(product.id)}
                      disabled={!selectedItems.has(product.id)}
                    >
                      -
                    </Button>
                    <span>{selectedItems.get(product.id) || 0}</span>
                    <Button
                      size='sm'
                      onClick={() => incrementItem(product.id)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              
              {selectedItems.size > 0 && (
                <Button onClick={handleAddToGrid} className='w-full'>
                  Add Selected Items to Grid
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function calculateWidth(widthIn: number, cellWidthIn: number): number {
  if (widthIn <= 0) return 0;
  if (widthIn < 12) return 1;
  return Math.max(2, Math.floor(widthIn / cellWidthIn));
}
```

---

### Step 7: Update Product Browser Sidebar

#### File: `front-end/features/planogram/components/product-sidebar/product-sidebar.tsx` (update)

Use new store:

```typescript
'use client';

import { useParams } from 'next/navigation';
import { useProductBrowserStore } from '@/features/planogram/store';
import { usePlanogramData } from '@/features/planogram/hooks';
// ... existing imports for category browsing

export function ProductSidebar() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  
  const { planogram } = usePlanogramData(planogramSlug);
  
  // Planogram store (browser sidebar slice)
  const sidebarOpen = usePlanogramStore.use.sidebarOpen();
  const toggleSidebar = usePlanogramStore.use.toggleSidebar();
  const toggleExpanded = usePlanogramStore.use.toggleSidebarExpand();
  
  if (!sidebarOpen) return null;
  
  // Use planogram.season directly from React Query
  const season = planogram?.season || 'summer';
  
  return (
    <div className='fixed left-0 top-0 h-screen z-40 w-96 bg-card border-r'>
      {/* Existing product browsing UI */}
      {/* Uses season variable for fetching products */}
    </div>
  );
}
```

---

### Step 8: Clean Up Old Files

Delete obsolete files:
- `front-end/features/planogram/store/planogram-slice.ts` - replaced by slices pattern
- `front-end/features/planogram/hooks/use-planogram-form.ts` - logic moved to components
- `front-end/features/planogram/hooks/use-planogram-layout.ts` - logic moved to components

Update exports in:
- `front-end/features/planogram/hooks/index.ts`
- `front-end/features/planogram/index.ts`

New file structure will be:
```
store/
├── slices/
│   ├── grid-slice.ts
│   ├── available-products-slice.ts
│   ├── product-browser-slice.ts
│   └── ai-slice.ts
└── index.ts (exports usePlanogramStore)
```

---

### Step 9: Update Page Component

#### File: `front-end/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page.tsx` (simplify)

Much simpler now:

```typescript
'use client';

import { useParams } from 'next/navigation';
import { usePlanogramData, usePlanogramStore } from '@/features/planogram';
import {
  Grid,
  ThreeJSView,
  ProductSidebar,
  AvailableProductsSidebar,
  PlanogramFormFields,
  PlanogramHeader,
  PlanogramDeleteButton,
  AIOverviewDialog,
} from '@/features/planogram/components';
import { Card, CardContent } from '@/components/ui/card';

export default function PlanogramDetailPage() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  
  const { planogram, layout, isLoading } = usePlanogramData(planogramSlug);
  
  // One store with all slices - easy access!
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const productSidebarOpen = usePlanogramStore.use.sidebarOpen();
  const availableSidebarOpen = usePlanogramStore.use.availableProductsSidebarOpen();
  
  if (isLoading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }
  
  if (!planogram) {
    return (
      <div className='bg-card rounded-lg border border-border p-6'>
        <p className='text-muted-foreground'>Planogram not found</p>
      </div>
    );
  }
  
  return (
    <div className='relative'>
      {/* Sidebars */}
      {productSidebarOpen && <ProductSidebar />}
      {availableSidebarOpen && <AvailableProductsSidebar />}
      
      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-6 py-8'>
        <PlanogramHeader planogram={planogram} />
        
        {/* Form Card */}
        <Card className='mb-8'>
          <CardContent className='p-6'>
            <PlanogramFormFields />
          </CardContent>
        </Card>
        
        {/* Grid and 3D View */}
        <div className='space-y-6'>
          {gridData ? (
            <>
              <Grid />
              {Object.keys(rowLayouts).length > 0 && (
                <ThreeJSView gridData={gridData} rowLayouts={rowLayouts} />
              )}
            </>
          ) : (
            <Card>
              <CardContent className='p-6'>
                <p className='text-muted-foreground'>
                  No layout data available for this planogram.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <PlanogramDeleteButton />
      </div>
      
      {/* AI Dialog */}
      <AIOverviewDialog />
    </div>
  );
}
```

---

## Benefits of New Architecture

1. **Separation of Concerns**: Each slice manages one domain (grid, products, sidebars, AI)
2. **Organized Code**: Separate files for each slice (~50-70 lines), combined into one store
3. **Easy Cross-Slice Access**: One import `usePlanogramStore`, access any slice, no complex coordination
4. **Simpler Data Flow**: React Query for server data, Zustand for UI/client state only
5. **No Sync Issues**: No copying data from React Query to Zustand
6. **Easier to Test**: Smaller, focused slices vs 390-line monolith
7. **Better Performance**: Only relevant parts re-render when state changes
8. **Type Safety**: Each slice has clear types, combined type is automatic
9. **Maintainability**: Clear file structure, easy to find and modify specific features

## Store Size Comparison

**Before:**
- `planogram-slice.ts`: **390 lines** (one monolithic file, poor organization)

**After (Slices Pattern):**
- `store/index.ts`: ~30 lines (combines slices)
- `slices/grid-slice.ts`: ~70 lines
- `slices/available-products-slice.ts`: ~60 lines
- `slices/product-browser-slice.ts`: ~20 lines
- `slices/ai-slice.ts`: ~25 lines
- **Total: ~205 lines** (split across 5 organized files)

**Key Improvement:** Better organization + easier cross-slice access = maintainable code

## Migration Strategy

1. ✅ Create new stores alongside old one
2. ✅ Create new hooks (use-available-products)
3. ✅ Update components one by one to use new stores
4. ✅ Test thoroughly after each component update
5. ✅ Delete old store and obsolete hooks last
6. ✅ Update all index.ts exports

---

## Testing Checklist

After implementation, verify:

- [ ] Form changes trigger backend updates
- [ ] Grid editing works (drag/drop items)
- [ ] Save layout persists changes
- [ ] Regenerate button updates layout from backend
- [ ] Available products sidebar shows correct products based on categories/season
- [ ] Adding products to grid works
- [ ] Product browser sidebar works
- [ ] 3D visualization updates with grid changes
- [ ] AI overview dialog works
- [ ] CSV download works
- [ ] Delete planogram works
- [ ] All sidebars toggle correctly

