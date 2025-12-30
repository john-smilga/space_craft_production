'use client';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type Planogram = z.infer<typeof schemas.Planogram>;
type PlanogramUpdatePayload = z.infer<typeof schemas.PatchedPlanogramUpdateRequest>;

type UpdatePlanogramVariables = {
  slug: string;
  data: PlanogramUpdatePayload;
};

async function updatePlanogram(variables: UpdatePlanogramVariables): Promise<Planogram> {
  const { slug, data } = variables;
  const response = await api.patch(`/planograms/${slug}/`, data);
  return schemas.Planogram.parse(response.data);
}

export function useUpdatePlanogramMutation() {
  const queryClient = useQueryClient();

  return useAppMutation<Planogram, UpdatePlanogramVariables>(
    updatePlanogram,
    {
      successMessage: 'Planogram updated successfully',
      errorMessage: 'Failed to update planogram',
      invalidateQueries: [['planograms', 'list']],
      onSuccess: async (data: Planogram, variables: UpdatePlanogramVariables) => {
        // If slug changed (e.g., name changed), remove old queries to prevent 404 refetch
        if (data.slug !== variables.slug) {
          queryClient.removeQueries({ queryKey: ['planograms', 'detail', variables.slug] });
          queryClient.removeQueries({ queryKey: ['planograms', 'layout', variables.slug] });
        }

        // Force refetch both queries to get the latest data from the server
        await queryClient.refetchQueries({ queryKey: ['planograms', 'detail', data.slug] });
        await queryClient.refetchQueries({ queryKey: ['planograms', 'layout', data.slug] });
      },
    }
  );
}
