import type { StateCreator } from 'zustand';
import type { Planogram, GridResponse } from '../../types';

export type DownloadSlice = {
  downloadLoading: boolean;

  setDownloadLoading: (loading: boolean) => void;
  downloadPlanogram: (planogram: Planogram, gridData: GridResponse | null) => Promise<void>;
}

export const createDownloadSlice: StateCreator<DownloadSlice> = (set) => ({
  // Initial state
  downloadLoading: false,
  
  // Actions
  setDownloadLoading: (loading) => set({ downloadLoading: loading }),
  downloadPlanogram: async (planogram, gridData) => {
    set({ downloadLoading: true });

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
      set({ downloadLoading: false });
    }
  },
});

