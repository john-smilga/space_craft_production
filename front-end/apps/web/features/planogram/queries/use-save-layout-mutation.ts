'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type Planogram = z.infer<typeof schemas.Planogram>;
type LayoutRequest = z.infer<typeof schemas.LayoutRequest>;

type SaveLayoutVariables = {
  slug: string;
  layout: LayoutRequest;
};

async function saveLayout(variables: SaveLayoutVariables): Promise<Planogram> {
  const { slug, layout } = variables;
  console.log('🔍 Saving layout:', { slug, url: `/planograms/${slug}/save-layout/`, payload: { layout } });
  const response = await api.post(`/planograms/${slug}/save-layout/`, { layout });
  console.log('✅ Layout saved successfully:', response.data);
  return schemas.Planogram.parse(response.data);
}

export function useSaveLayoutMutation() {
  return useAppMutation<Planogram, SaveLayoutVariables>(
    saveLayout,
    {
      // Fire-and-forget: no successMessage, no invalidateQueries
      errorMessage: 'Failed to save layout',
      invalidateQueries: [], // Explicitly no invalidation
    }
  );
}
