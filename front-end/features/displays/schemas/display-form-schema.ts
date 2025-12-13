import { z } from 'zod';

export const displayFormSchema = z.object({
  name: z.string().min(1, 'Display name is required').max(100, 'Display name must be less than 100 characters'),
  type: z.string().min(1, 'Display type is required'),
  width_in: z.number().positive('Width must be a positive number'),
  height_in: z.number().positive('Height must be a positive number'),
  depth_in: z.number().positive('Depth must be a positive number').nullable().optional(),
  shelf_count: z.number().int().positive('Shelf count must be a positive integer'),
  shelf_spacing: z.number().positive('Shelf spacing must be a positive number').nullable().optional(),
});

export type DisplayFormInput = z.infer<typeof displayFormSchema>;

