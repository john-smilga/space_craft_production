import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';
import type { Planogram, LayoutItem } from '../types';

interface SaveLayoutVariables {
  slug: string;
  layout: Record<number, LayoutItem[]>;
  preserve_layout?: boolean;
}

export function useSaveLayoutMutation() {
  return useAppMutation<Planogram, SaveLayoutVariables>(
    async (variables) => {
      const { slug, layout, preserve_layout = true } = variables;
      const response = await api.post(`/planograms/${slug}/layout/`, {
        layout,
        preserve_layout,
      });
      const validated = schemas.Planogram.parse(response.data);
      return validated;
    },
    {
      successMessage: 'Layout saved successfully',
      errorMessage: 'Failed to save layout',
      invalidateQueries: [['planograms']],
    }
  );
}


