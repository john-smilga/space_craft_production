import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from '@/lib/zustand/create-selectors';
import { createGridSlice, type GridSlice } from './slices/grid-slice';
import { createAvailableProductsSlice, type AvailableProductsSlice } from './slices/available-products-slice';
import { createProductBrowserSlice, type ProductBrowserSlice } from './slices/product-browser-slice';
import { createAISlice, type AISlice } from './slices/ai-slice';
import { createFormSlice, type FormSlice } from './slices/form-slice';
import { createDownloadSlice, type DownloadSlice } from './slices/download-slice';

// Combined store type
type PlanogramStore = GridSlice & 
  AvailableProductsSlice & 
  ProductBrowserSlice & 
  AISlice & 
  FormSlice & 
  DownloadSlice;

// Create the combined store
const usePlanogramStoreBase = create<PlanogramStore>()(
  devtools(
    (...args) => ({
      ...createGridSlice(...args),
      ...createAvailableProductsSlice(...args),
      ...createProductBrowserSlice(...args),
      ...createAISlice(...args),
      ...createFormSlice(...args),
      ...createDownloadSlice(...args),
    }),
    { name: 'PlanogramStore' }
  )
);

// Export with selectors
export const usePlanogramStore = createSelectors(usePlanogramStoreBase);

// Export types
export type { 
  PlanogramStore, 
  GridSlice, 
  AvailableProductsSlice, 
  ProductBrowserSlice, 
  AISlice,
  FormSlice,
  DownloadSlice
};
