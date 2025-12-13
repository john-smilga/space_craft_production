import { z } from 'zod';

export const storeFormSchema = z.object({
  name: z.string().min(1, 'Store name is required').max(100, 'Store name must be less than 100 characters'),
  store_code: z.string().min(1, 'Store code is required').max(50, 'Store code must be less than 50 characters'),
  address: z.string().min(1, 'Address is required').max(500, 'Address must be less than 500 characters'),
});

export type StoreFormInput = z.infer<typeof storeFormSchema>;

