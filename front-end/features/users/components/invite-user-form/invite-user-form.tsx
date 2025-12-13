'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore, useRequireAdmin } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';
import { useInviteUserMutation } from '../../queries';

export function InviteUserForm() {
  useRequireAdmin();
  const user = useAuthStore.use.user();
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState<{ link: string; token: string } | null>(null);

  const inviteMutation = useInviteUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);

    try {
      const result = await inviteMutation.mutateAsync({
        email,
        role: 'member',
      });

      setSuccess({
        link: result.invitation_link,
        token: result.invitation_token,
      });
      setEmail('');
    } catch {
      // Error handled by mutation
    }
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
          <form onSubmit={handleSubmit} className='space-y-4'>
            <FormField
              label='Email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder='user@example.com'
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

            {inviteMutation.isError && (
              <Alert variant='destructive'>
                <AlertDescription>{inviteMutation.error?.message || 'Failed to create invitation'}</AlertDescription>
              </Alert>
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

