import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ShelvesTable } from './shelves-table';

describe('ShelvesTable', () => {
  it.skip('should render correctly', () => {
    render(<ShelvesTable />);
    expect(screen).toBeDefined();
  });
});

