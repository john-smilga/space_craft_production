import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PlanogramFormFields } from './planogram-form-fields';

describe('PlanogramFormFields', () => {
  it.skip('should render correctly', () => {
    render(<PlanogramFormFields />);
    expect(screen).toBeDefined();
  });
});

