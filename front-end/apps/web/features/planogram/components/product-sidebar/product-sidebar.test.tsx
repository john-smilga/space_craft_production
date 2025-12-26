import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductSidebar } from './product-sidebar';

describe('ProductSidebar', () => {
  it.skip('should render correctly', () => {
    render(<ProductSidebar />);
    expect(screen).toBeDefined();
  });
});

