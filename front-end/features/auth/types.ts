export interface Company {
  id: number;
  name: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  slug: string;
  role: 'admin' | 'member';
  date_joined?: string;
  company: Company | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  token: string;
  password: string;
  username?: string;
}

export interface LoginResponse {
  user: User;
}

export interface RegisterResponse {
  user: User;
}

