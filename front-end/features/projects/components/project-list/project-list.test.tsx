import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectList } from './project-list';

describe('ProjectList', () => {
  it.skip('should render correctly', () => {
    render(<ProjectList />);
    expect(screen).toBeDefined();
  });
});

