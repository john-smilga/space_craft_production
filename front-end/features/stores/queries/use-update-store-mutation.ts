'use client';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type UpdateStoreInput = z.infer<typeof schemas.StoreUpdateRequest>;
type StoreResponse = z.infer<typeof schemas.StoreUpdate>;

export function useUpdateStoreMutation(storeSlug: string) {
  const queryClient = useQueryClient();

  return useAppMutation<StoreResponse, UpdateStoreInput>(
    async (input) => {
      const validatedInput = schemas.StoreUpdateRequest.parse(input);
      const response = await api.put(`/stores/${storeSlug}/`, validatedInput);
      return schemas.StoreUpdate.parse(response.data);
    },
    {
      successMessage: 'Store updated successfully',
      errorMessage: 'Failed to update store',
      invalidateQueries: [['stores'], ['store', storeSlug]],
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ['store', data.name] });
      },
    }
  );
}

