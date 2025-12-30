'use client';
import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import api from '@/lib/axios';

const LeafCategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  slug: z.string().optional(),
  path: z.string().optional(),
  has_children: z.boolean().optional(),
});

const LeafCategoryListResponseSchema = z.object({
  categories: z.array(LeafCategorySchema),
});

type Category = z.infer<typeof LeafCategorySchema>;

async function fetchLeafCategories(): Promise<Category[]> {
  const { data } = await api.get('/categories/leaf/');
  const validated = LeafCategoryListResponseSchema.parse(data);
  return validated.categories;
}

export function useLeafCategoriesQuery() {
  return useQuery({
    queryKey: ['categories', 'leaf'],
    queryFn: fetchLeafCategories,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
  });
}
