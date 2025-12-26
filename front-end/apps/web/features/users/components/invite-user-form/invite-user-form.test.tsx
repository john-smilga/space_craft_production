import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InviteUserForm } from './invite-user-form';

describe('InviteUserForm', () => {
  it.skip('should render correctly', () => {
    render(<InviteUserForm />);
    expect(screen).toBeDefined();
  });
});

