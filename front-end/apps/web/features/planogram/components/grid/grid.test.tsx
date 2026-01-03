import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Grid } from './grid';

describe('Grid', () => {
  it.skip('should render correctly', () => {
    render(<Grid planogramSlug="test-slug" />);
    expect(screen).toBeDefined();
  });
});

