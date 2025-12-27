'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useLoginMutation } from '@/features/auth';
import { schemas } from '@/lib/generated/api-schemas';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { FormSelectField } from '@/components/ui/form-select-field';

const DEMO_USERS = [
  { label: 'Publix Admin', value: 'publix', email: 'admin_publix@publix.com', password: 'admin123' },
  { label: 'Walmart Admin', value: 'walmart', email: 'admin_walmart@walmart.com', password: 'admin123' },
];

type LoginFormData = z.infer<typeof schemas.LoginRequest>;

export function LoginForm() {
  const [demoUser, setDemoUser] = useState('');
  const loginMutation = useLoginMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemas.LoginRequest),
  });

  const handleDemoUserChange = (value: string) => {
    setDemoUser(value);
    if (value) {
      const user = DEMO_USERS.find((u) => u.value === value);
      if (user) {
        setValue('email', user.email);
        setValue('password', user.password);
      }
    } else {
      setValue('email', '');
      setValue('password', '');
    }
  };

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push('/dashboard');
      }
    });
  };

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle className='text-2xl text-center'>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <FormSelectField
            label='Demo User'
            value={demoUser}
            onValueChange={handleDemoUserChange}
            options={DEMO_USERS.map((user) => ({ label: user.label, value: user.value }))}
            placeholder='Select a demo user...'
          />
          <FormInput
            name='email'
            label='Email'
            type='email'
            placeholder='Email'
            register={register}
            error={errors.email}
          />
          <FormInput
            name='password'
            label='Password'
            type='password'
            placeholder='Password'
            register={register}
            error={errors.password}
          />
          <Button type='submit' disabled={loginMutation.isPending} className='w-full'>
            {loginMutation.isPending ? 'Loading...' : 'Login'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
