import { z } from 'zod';

export const inviteUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  role: z.enum(['admin', 'member']),
});

export type InviteUserFormInput = z.infer<typeof inviteUserSchema>;

