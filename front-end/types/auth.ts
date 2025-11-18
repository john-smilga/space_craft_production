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
