'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import { useRequireAdmin } from '@/hooks/useRequireAdmin';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';

interface InviteResponse {
  invitation_link: string;
  invitation_token: string;
}

interface InviteVariables {
  email: string;
  role: string;
}

export default function InviteUserPage() {
  const isAdmin = useRequireAdmin();
  const { user } = useAuthStore();

  if (!isAdmin) {
    return null; // Redirecting via useRequireAdmin
  }
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState<{ link: string; token: string } | null>(null);

  const inviteMutation = useMutation<InviteResponse, InviteVariables>(
    async (variables) => {
      const response = await api.post('/users/invite/', variables);
      return {
        invitation_link: response.data.invitation_link,
        invitation_token: response.data.invitation_token,
      };
    },
    { toastResource: 'user invitation' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(null);
    inviteMutation.reset();

    const result = await inviteMutation.mutate({
      email,
      role: 'member',
    });

    if (result.data) {
      setSuccess({
        link: result.data.invitation_link,
        token: result.data.invitation_token,
      });
      setEmail('');
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

            {inviteMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{inviteMutation.error}</AlertDescription>
              </Alert>
            )}

            <Button type='submit' disabled={inviteMutation.loading} className='w-full'>
              {inviteMutation.loading ? 'Creating Invitation...' : 'Create Invitation'}
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
