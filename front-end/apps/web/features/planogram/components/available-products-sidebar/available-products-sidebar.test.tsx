import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AvailableProductsSidebar } from './available-products-sidebar';

describe('AvailableProductsSidebar', () => {
  it.skip('should render correctly', () => {
    render(<AvailableProductsSidebar />);
    expect(screen).toBeDefined();
  });
});

