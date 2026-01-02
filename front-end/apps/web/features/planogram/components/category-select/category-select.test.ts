import { describe, it, expect } from 'vitest';
import { CATEGORY_COLOR } from './category-select';

describe('CATEGORY_COLOR', () => {
  it('should have correct color mappings', () => {
    expect(CATEGORY_COLOR).toBeDefined();
    expect(CATEGORY_COLOR.beef).toBe('#b91c1c');
  });
});

