import { faker } from '@faker-js/faker';

export interface Store {
  id: string;
  slug: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export function createStore(overrides: Partial<Store> = {}): Store {
  const name = faker.company.name() + ' Store';
  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    name,
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zip_code: faker.location.zipCode(),
    company_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  };
}








