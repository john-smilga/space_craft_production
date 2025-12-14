import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Export types inferred from generated schemas
export type User = z.infer<typeof schemas.User>;
export type Role = z.infer<typeof schemas.RoleEnum>;
export type LoginCredentials = z.infer<typeof schemas.LoginRequest>;
export type RegisterData = z.infer<typeof schemas.RegisterRequestRequest>;

