'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormField } from '@/components/ui/form-field';
import { FormSelectField } from '@/components/ui/form-select-field';

const DEMO_USERS = [
  { label: 'Publix Admin', value: 'publix', email: 'admin_publix@publix.com', password: 'admin123' },
  { label: 'Walmart Admin', value: 'walmart', email: 'admin_walmart@walmart.com', password: 'admin123' },
];

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [demoUser, setDemoUser] = useState('');
  const [error, setError] = useState<string | null>(null);
  const loginMutation = useLoginMutation();
  const router = useRouter();

  const handleDemoUserChange = (value: string) => {
    setDemoUser(value);
    if (value) {
      const user = DEMO_USERS.find((u) => u.value === value);
      if (user) {
        setEmail(user.email);
        setPassword(user.password);
      }
    } else {
      setEmail('');
      setPassword('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await loginMutation.mutateAsync({ email, password });
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    }
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <FormSelectField
            label='Demo User'
            value={demoUser}
            onValueChange={handleDemoUserChange}
            options={DEMO_USERS.map((user) => ({ label: user.label, value: user.value }))}
            placeholder='Select a demo user...'
          />
          <FormField
            label='Email'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FormField
            label='Password'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='text-destructive text-sm'>{error}</p>}
          <Button type='submit' disabled={loginMutation.isPending} className='w-full'>
            {loginMutation.isPending ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
