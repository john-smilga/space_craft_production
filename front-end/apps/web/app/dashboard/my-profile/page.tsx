'use client';

import { useState } from 'react';
import { useAuthStore, useUpdateUsernameMutation } from '@/features/auth';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';

export default function UserPage() {
  const user = useAuthStore.use.user();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState('');

  const updateUsernameMutation = useUpdateUsernameMutation();

  const handleEditUsername = () => {
    setUsername(user?.username || '');
    updateUsernameMutation.reset();
    setIsEditingUsername(true);
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setUsername('');
    updateUsernameMutation.reset();
  };

  const handleSaveUsername = async () => {
    if (!username.trim()) {
      return;
    }

    if (username === user?.username) {
      setIsEditingUsername(false);
      return;
    }

    try {
      await updateUsernameMutation.mutateAsync({ username });
      setIsEditingUsername(false);
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>My Profile</h1>
      <Card>
        <CardContent className='p-6'>
          <div className='space-y-4'>
            <div>
              {isEditingUsername ? (
                <div className='space-y-2'>
                  <FormField
                    label='Username'
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={updateUsernameMutation.isPending}
                  />
                  {updateUsernameMutation.isError && (
                    <Alert variant='destructive'>
                      <AlertDescription>{(updateUsernameMutation.error as Error)?.message || 'Failed to update username'}</AlertDescription>
                    </Alert>
                  )}
                  <div className='flex gap-2'>
                    <Button onClick={handleSaveUsername} disabled={updateUsernameMutation.isPending}>
                      {updateUsernameMutation.isPending ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={handleCancelEdit} disabled={updateUsernameMutation.isPending} variant='outline'>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Label>Username</Label>
                  <div className='flex items-center gap-2 mt-1'>
                    <p className='text-lg'>{user?.username}</p>
                    <Button onClick={handleEditUsername} variant='ghost' size='sm' className='h-auto p-0 text-primary hover:underline'>
                      Edit
                    </Button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <Label>Email</Label>
              <p className='text-lg'>{user?.email}</p>
            </div>
            <div>
              <Label>User ID</Label>
              <p className='text-lg'>{user?.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
