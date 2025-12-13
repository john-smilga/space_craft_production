import type { User } from '../auth/types';

export type { User };

export interface UsersResponse {
  users: User[];
}

export interface UserResponse {
  user: User;
}

export interface InviteUserInput {
  email: string;
  role: string;
}

export interface InviteResponse {
  invitation_link: string;
  invitation_token: string;
}

