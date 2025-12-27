'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRegisterMutation } from '@/features/auth';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';

export function RegisterForm() {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [invitationData, setInvitationData] = useState<{ email: string; company: { id: number; name: string } | null } | null>(null);
  const registerMutation = useRegisterMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenParam = searchParams.get('token');

    const validateToken = async () => {
      if (!tokenParam) {
        setError('Invalid invitation link. Token is missing.');
        setLoading(false);
        return;
      }

      setToken(tokenParam);

      try {
        const response = await api.get(`/auth/validate-invitation/?token=${tokenParam}`);
        if (response.data.valid) {
          setInvitationData({
            email: response.data.email,
            company: response.data.company,
          });
        } else {
          setError('Invalid or expired invitation token');
        }
      } catch (err: unknown) {
        const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Invalid invitation token';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await registerMutation.mutateAsync({
        token: token!,
        password,
        username: username || undefined,
      });
      router.push('/dashboard');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message || 'Registration failed');
      } else {
        setError('Registration failed');
      }
    }
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='text-muted-foreground'>Validating invitation...</p>
      </div>
    );
  }

  if (error && !invitationData) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
        <Card className='w-full max-w-md mx-auto'>
          <CardContent className='p-6 text-center'>
            <Alert variant='destructive' className='mb-4'>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button onClick={() => router.push('/login')} variant='outline'>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl text-center'>Complete Your Registration</CardTitle>
        </CardHeader>
        <CardContent>
          {invitationData && (
            <Alert className='mb-6'>
              <AlertDescription>
                <p className='text-sm mb-1'>
                  Email: <span className='font-medium'>{invitationData.email}</span>
                </p>
                {invitationData.company && (
                  <p className='text-sm'>
                    Company: <span className='font-medium'>{invitationData.company.name}</span>
                  </p>
                )}
              </AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Username'
              type='text'
              placeholder='Username (optional)'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormField
              label='Password'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Alert variant='destructive'>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type='submit' disabled={registerMutation.isPending} className='w-full'>
              {registerMutation.isPending ? 'Registering...' : 'Complete Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
