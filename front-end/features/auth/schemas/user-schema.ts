import { z } from 'zod';

export const companySchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  slug: z.string(),
  role: z.enum(['admin', 'member']),
  date_joined: z.string().optional(),
  company: companySchema.nullable(),
});

export type User = z.infer<typeof userSchema>;
export type Company = z.infer<typeof companySchema>;

