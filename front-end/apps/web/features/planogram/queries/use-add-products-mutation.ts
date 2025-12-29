'use client';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';
import { useAppMutation } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type Layout = z.infer<typeof schemas.Layout>;
type AddProductsRequest = z.infer<typeof schemas.AddProductsRequest>;

type AddProductsVariables = {
  slug: string;
  data: AddProductsRequest;
};

async function addProducts(variables: AddProductsVariables): Promise<Layout> {
  const { slug, data } = variables;
  const response = await api.post(`/planograms/${slug}/layout/add-products/`, data);
  return schemas.Layout.parse(response.data);
}

export function useAddProductsMutation() {
  const queryClient = useQueryClient();

  return useAppMutation<Layout, AddProductsVariables>(
    addProducts,
    {
      successMessage: 'Products added successfully',
      errorMessage: 'Failed to add products',
      onSuccess: async (_data: Layout, variables: AddProductsVariables) => {
        await queryClient.invalidateQueries({ queryKey: ['planograms', 'layout', variables.slug] });
      },
    }
  );
}
