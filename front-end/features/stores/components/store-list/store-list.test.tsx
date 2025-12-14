import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StoreList } from './store-list';

describe('StoreList', () => {
  it.skip('should render correctly', () => {
    render(<StoreList />);
    expect(screen).toBeDefined();
  });
});

