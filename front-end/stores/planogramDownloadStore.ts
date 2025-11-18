import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Planogram } from '@/types/planograms';
import type { GridResponse } from '@/types/planograms';
import { generatePlanogramCSV } from '@/lib/planogramCSV';
import toast from 'react-hot-toast';

interface PlanogramDownloadState {
  loading: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  downloadPlanogram: (planogram: Planogram, gridData: GridResponse | null) => Promise<void>;
}

export const usePlanogramDownloadStore = create<PlanogramDownloadState>()(
  devtools(
    (set) => ({
      // Initial state
      loading: false,

      // Actions
      setLoading: (loading) => set({ loading }, false, 'planogramDownload/setLoading'),

      downloadPlanogram: async (planogram, gridData) => {
        set({ loading: true }, false, 'planogramDownload/start');

        try {
          // Generate CSV content
          const csvContent = generatePlanogramCSV(planogram, gridData);

          // Create blob and download
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

          toast.success('Planogram downloaded successfully');
        } catch (error) {
          console.error('Error downloading planogram:', error);
          toast.error('Failed to download planogram');
        } finally {
          set({ loading: false }, false, 'planogramDownload/complete');
        }
      },
    }),
    { name: 'PlanogramDownloadStore' }
  )
);
