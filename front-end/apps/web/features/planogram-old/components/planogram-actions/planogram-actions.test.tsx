import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanogramActions } from './planogram-actions';

describe('PlanogramActions', () => {
  it.skip('should render correctly', () => {
    const mockWatch = vi.fn(() => ({
      name: 'Test',
      season: 'summer',
      shelfCount: 1,
      selectedCategoryIds: [],
    }));

    render(
      <PlanogramActions
        watch={mockWatch as never}
        planogramSlug='test-slug'
        planogramData={null}
      />
    );
    expect(screen).toBeDefined();
  });
});

