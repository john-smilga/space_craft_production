import { z } from 'zod';
import { userSchema } from './user-schema';

export const loginCredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const loginResponseSchema = z.object({
  user: userSchema,
});

export const registerDataSchema = z.object({
  token: z.string(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  username: z.string().optional(),
});

export const registerResponseSchema = z.object({
  user: userSchema,
});

export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RegisterData = z.infer<typeof registerDataSchema>;
export type RegisterResponse = z.infer<typeof registerResponseSchema>;

