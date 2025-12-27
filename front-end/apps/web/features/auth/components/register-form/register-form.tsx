'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterMutation } from '@/features/auth';
import { schemas } from '@/lib/generated/api-schemas';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormInput } from '@/components/ui/form-input';

const registerFormSchema = schemas.RegisterRequestRequest.omit({ token: true });
type RegisterFormData = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [invitationData, setInvitationData] = useState<{ email: string; company: { id: number; name: string } | null } | null>(null);
  const registerMutation = useRegisterMutation();
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  });

  useEffect(() => {
    const tokenParam = searchParams.get('token');

    const validateToken = async () => {
      if (!tokenParam) {
        setTokenError('Invalid invitation link. Token is missing.');
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
          setTokenError('Invalid or expired invitation token');
        }
      } catch (err: unknown) {
        const errorMessage = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Invalid invitation token';
        setTokenError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(
      { ...data, token: token! },
      {
        onSuccess: () => {
          router.push('/dashboard');
        }
      }
    );
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='text-muted-foreground'>Validating invitation...</p>
      </div>
    );
  }

  if (tokenError && !invitationData) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
        <Card className='w-full max-w-md mx-auto'>
          <CardContent className='p-6 text-center'>
            <Alert variant='destructive' className='mb-4'>
              <AlertDescription>{tokenError}</AlertDescription>
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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput
              name='username'
              label='Username'
              type='text'
              placeholder='Username (optional)'
              register={register}
              error={errors.username}
            />
            <FormInput
              name='password'
              label='Password'
              type='password'
              placeholder='Password'
              register={register}
              error={errors.password}
              required
            />
            <Button type='submit' disabled={registerMutation.isPending} className='w-full'>
              {registerMutation.isPending ? 'Registering...' : 'Complete Registration'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
