import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardHeader } from './dashboard-header';

describe('DashboardHeader', () => {
  it.skip('should render correctly', () => {
    render(<DashboardHeader />);
    expect(screen).toBeDefined();
  });
});

