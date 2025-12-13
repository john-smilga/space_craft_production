import { z } from 'zod';

export const projectFormSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  store_slug: z.string().min(1, 'Store is required'),
});

export type ProjectFormInput = z.infer<typeof projectFormSchema>;

