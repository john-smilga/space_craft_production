import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NoStoresAlert } from './no-stores-alert';

describe('NoStoresAlert', () => {
  it.skip('should render correctly', () => {
    render(<NoStoresAlert />);
    expect(screen).toBeDefined();
  });
});

