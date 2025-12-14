import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DisplayList } from './display-list';

describe('DisplayList', () => {
  it.skip('should render correctly', () => {
    render(<DisplayList />);
    expect(screen).toBeDefined();
  });
});

