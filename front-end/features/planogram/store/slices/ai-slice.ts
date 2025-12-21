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

