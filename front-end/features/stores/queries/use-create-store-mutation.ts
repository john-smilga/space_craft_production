'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';;

type CreateStoreInput = z.infer<typeof schemas.StoreCreateRequest>;
type StoreResponse = z.infer<typeof schemas.Store>;

export function useCreateStoreMutation() {
  return useAppMutation<StoreResponse, CreateStoreInput>(
    async (input) => {
      const validatedInput = schemas.StoreCreateRequest.parse(input);
      const response = await api.post('/stores/', validatedInput);
      return schemas.Store.parse(response.data);
    },
    {
      successMessage: 'Store created successfully',
      errorMessage: 'Failed to create store',
      invalidateQueries: [['stores']],
    }
  );
}

