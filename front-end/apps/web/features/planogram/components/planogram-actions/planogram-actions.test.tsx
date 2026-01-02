import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanogramActions } from './planogram-actions';

describe('PlanogramActions', () => {
  it.skip('should render correctly', () => {
    render(<PlanogramActions />);
    expect(screen).toBeDefined();
  });
});

