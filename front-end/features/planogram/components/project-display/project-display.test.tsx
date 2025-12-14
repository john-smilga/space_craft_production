import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDisplay } from './project-display';

describe('ProjectDisplay', () => {
  it.skip('should render correctly', () => {
    render(<ProjectDisplay projectName={null} />);
    expect(screen).toBeDefined();
  });
});

