import { faker } from '@faker-js/faker';

export interface Display {
  id: string;
  slug: string;
  name: string;
  width: number;
  height: number;
  depth: number;
  display_type: 'standard' | 'custom';
  category?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export function createDisplay(overrides: Partial<Display> = {}): Display {
  const name = faker.commerce.productName() + ' Display';
  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    name,
    width: faker.number.int({ min: 20, max: 100 }),
    height: faker.number.int({ min: 40, max: 200 }),
    depth: faker.number.int({ min: 10, max: 50 }),
    display_type: faker.helpers.arrayElement(['standard', 'custom'] as const),
    category: faker.helpers.arrayElement(['refrigerated', 'shelf', 'endcap', 'checkout']),
    company_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  };
}

export function createStandardDisplay(overrides: Partial<Display> = {}): Display {
  return createDisplay({ display_type: 'standard', ...overrides });
}

export function createCustomDisplay(overrides: Partial<Display> = {}): Display {
  return createDisplay({ display_type: 'custom', ...overrides });
}








