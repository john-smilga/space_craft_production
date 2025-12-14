import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

export type UserType = z.infer<typeof schemas.User>;
export type InviteUserInput = z.infer<typeof schemas.UserInviteRequest>;
export type InviteResponse = z.infer<typeof schemas.UserInviteResponse>;

