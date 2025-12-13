import { faker } from '@faker-js/faker';

export interface Planogram {
  id: string;
  slug: string;
  name: string;
  project_id: string;
  project_name: string;
  display_id: string;
  display_name: string;
  categories: string[];
  season?: string;
  status: 'draft' | 'published';
  grid_data?: unknown;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export function createPlanogram(overrides: Partial<Planogram> = {}): Planogram {
  const name = faker.commerce.productName() + ' Planogram';
  return {
    id: faker.string.uuid(),
    slug: faker.helpers.slugify(name).toLowerCase(),
    name,
    project_id: faker.string.uuid(),
    project_name: faker.commerce.department() + ' Project',
    display_id: faker.string.uuid(),
    display_name: faker.commerce.productName() + ' Display',
    categories: faker.helpers.arrayElements(
      ['beverages', 'snacks', 'dairy', 'frozen', 'bakery'],
      faker.number.int({ min: 1, max: 3 })
    ),
    season: faker.helpers.arrayElement(['spring', 'summer', 'fall', 'winter', undefined]),
    status: faker.helpers.arrayElement(['draft', 'published'] as const),
    grid_data: null,
    company_id: faker.string.uuid(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.recent().toISOString(),
    ...overrides,
  };
}








