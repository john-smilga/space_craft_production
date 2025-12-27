'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAuthStore, useRequireAdmin } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormInput } from '@/components/ui/form-input';
import { FormField } from '@/components/ui/form-field';
import { useInviteUserMutation } from '../../queries';

const inviteFormSchema = z.object({
  email: z.string().min(1).email(),
  username: z.string().min(1).max(150),
});

type InviteFormData = z.infer<typeof inviteFormSchema>;

export function InviteUserForm() {
  useRequireAdmin();
  const user = useAuthStore.use.user();
  const [success, setSuccess] = useState<{ link: string; token: string } | null>(null);

  const inviteMutation = useInviteUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      email: '',
      username: '',
    },
  });

  const onSubmit = (data: InviteFormData) => {
    setSuccess(null);

    inviteMutation.mutate(
      {
        ...data,
        role: 'member',
      },
      {
        onSuccess: (result) => {
          setSuccess({
            link: result.invitation_link,
            token: result.invitation_token,
          });
          reset();
        }
      }
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Link copied to clipboard!');
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Invite User</h1>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Create Invitation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <FormInput
              name='email'
              label='Email'
              type='email'
              register={register}
              error={errors.email}
              placeholder='user@example.com'
            />

            <FormInput
              name='username'
              label='Username'
              type='text'
              register={register}
              error={errors.username}
              placeholder='username'
            />

            {user?.company && (
              <>
                <FormField
                  label='Company'
                  type='text'
                  value={user.company.name}
                  readOnly
                  className='bg-muted'
                />
                <p className='text-xs text-muted-foreground'>Users will be added to your company as members</p>
              </>
            )}

            <Button type='submit' disabled={inviteMutation.isPending} className='w-full'>
              {inviteMutation.isPending ? 'Creating Invitation...' : 'Create Invitation'}
            </Button>
          </form>

          {success && (
            <Alert className='mt-6'>
              <AlertDescription className='mb-2'>
                <p className='font-medium mb-2'>Invitation created successfully!</p>
                <div className='space-y-2'>
                  <div>
                    <label className='block text-xs font-medium mb-1'>Invitation Link:</label>
                    <div className='flex gap-2'>
                      <Input type='text' value={success.link} readOnly className='flex-1 text-sm bg-muted' />
                      <Button type='button' onClick={() => copyToClipboard(success.link)} variant='outline' size='sm'>
                        Copy
                      </Button>
                    </div>
                  </div>
                  <p className='text-xs mt-2'>Share this link with the user. They will use it to complete their registration.</p>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </>
  );
}
