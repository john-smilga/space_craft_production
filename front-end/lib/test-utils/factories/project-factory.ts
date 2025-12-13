import { faker } from '@faker-js/faker';

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  store_id: string;
  store_name: string;
  company_id: string;
  planogram_count: number;
  created_at: string;
  updated_at: string;
}

export function createProject(overrides: Partial<Project> = {}): Project {
  const name = faker.commerce.department() + ' Project';
  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    name,
    description: faker.lorem.sentence(),
    store_id: faker.string.uuid(),
    store_name: faker.company.name() + ' Store',
    company_id: faker.string.uuid(),
    planogram_count: faker.number.int({ min: 0, max: 10 }),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  };
}








