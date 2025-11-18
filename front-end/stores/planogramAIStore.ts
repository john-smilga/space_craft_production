import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface PlanogramAIState {
  dialogOpen: boolean;
  loading: boolean;
  error: string | null;
  overview: string | null;

  // Actions
  setDialogOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setOverview: (overview: string | null) => void;
  reset: () => void;
}

export const usePlanogramAIStore = create<PlanogramAIState>()(
  devtools(
    (set) => ({
      // Initial state
      dialogOpen: false,
      loading: false,
      error: null,
      overview: null,

      // Actions
      setDialogOpen: (open) => set({ dialogOpen: open }, false, 'planogramAI/setDialogOpen'),
      setLoading: (loading) => set({ loading }, false, 'planogramAI/setLoading'),
      setError: (error) => set({ error }, false, 'planogramAI/setError'),
      setOverview: (overview) => set({ overview }, false, 'planogramAI/setOverview'),
      reset: () => set({ loading: false, error: null, overview: null }, false, 'planogramAI/reset'),
    }),
    { name: 'PlanogramAIStore' }
  )
);
