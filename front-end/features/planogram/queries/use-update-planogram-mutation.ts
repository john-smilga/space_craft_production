import { useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import type { Planogram, LayoutItem } from '../types';

interface UpdatePlanogramVariables {
  slug: string;
  name: string;
  width_in: number;
  height_in: number;
  shelf_count: number;
  display_id?: number;
  season?: string;
  category_ids?: number[];
  layout?: Record<number, LayoutItem[]>;
  preserve_layout?: boolean;
}

export function useUpdatePlanogramMutation() {
  const queryClient = useQueryClient();

  return useAppMutation<Planogram, UpdatePlanogramVariables>(
    async (variables) => {
      const { slug, ...data } = variables;
      const response = await api.put(`/planograms/${slug}/`, data);
      return response.data.planogram;
    },
    {
      successMessage: 'Planogram updated successfully',
      errorMessage: 'Failed to update planogram',
      invalidateQueries: [['planograms']],
      onSuccess: (data) => {
        queryClient.setQueryData(['planograms', data.slug], { planogram: data });
        queryClient.invalidateQueries({ queryKey: ['planograms', data.slug] });
      },
    }
  );
}

