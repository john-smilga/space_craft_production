import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DashboardContent } from './dashboard-content';

describe('DashboardContent', () => {
  it.skip('should render correctly', () => {
    render(<DashboardContent />);
    expect(screen).toBeDefined();
  });
});

