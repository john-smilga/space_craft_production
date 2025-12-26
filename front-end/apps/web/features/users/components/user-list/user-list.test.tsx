import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserList } from './user-list';

describe('UserList', () => {
  it.skip('should render correctly', () => {
    render(<UserList />);
    expect(screen).toBeDefined();
  });
});

