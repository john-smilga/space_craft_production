import { faker } from '@faker-js/faker';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'member';
  company_id: string;
  company_name: string;
  created_at: string;
}

export function createUser(overrides: Partial<User> = {}): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    role: 'member',
    company_id: faker.string.uuid(),
    company_name: faker.company.name(),
    created_at: faker.date.past().toISOString(),
    ...overrides,
  };
}

export function createAdmin(overrides: Partial<User> = {}): User {
  return createUser({ role: 'admin', ...overrides });
}








