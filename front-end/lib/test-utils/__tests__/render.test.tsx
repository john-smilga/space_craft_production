import { describe, it, expect } from 'vitest';
import { render, screen } from '../render';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Simple test component that uses React Query
function TestComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['test'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:8000/api/auth/me/');
      return response.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Test Component</h1>
      {data && <p>User: {data.user.email}</p>}
    </div>
  );
}

describe('Custom Render', () => {
  it('should render a component with QueryClient provider', () => {
    render(<TestComponent />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should provide a fresh QueryClient for each test', () => {
    const { queryClient } = render(<TestComponent />);
    
    expect(queryClient).toBeDefined();
    expect(queryClient.getDefaultOptions().queries?.retry).toBe(false);
  });
});

describe('MSW Integration', () => {
  it('should mock API calls', async () => {
    render(<TestComponent />);
    
    // Initially shows loading
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    
    // After MSW responds, shows user data
    const userElement = await screen.findByText(/User:/);
    expect(userElement).toBeInTheDocument();
  });
});








