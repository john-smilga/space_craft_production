'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FormField } from '@/components/ui/form-field';

export default function UserPage() {
  const { user, fetchUser } = useAuthStore();
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState(user?.username || '');

  useEffect(() => {
    if (user?.username && !isEditingUsername) {
      setUsername(user.username);
    }
  }, [user?.username, isEditingUsername]);

  const updateUsernameMutation = useMutation<void, { username: string }>(
    async (variables) => {
      await api.patch('/users/me/username/', variables);
    },
    { toastResource: 'username' }
  );

  const handleEditUsername = () => {
    setUsername(user?.username || '');
    setIsEditingUsername(true);
    updateUsernameMutation.reset();
  };

  const handleCancelEdit = () => {
    setIsEditingUsername(false);
    setUsername(user?.username || '');
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

    const result = await updateUsernameMutation.mutate({ username });
    if (result.error) {
      return;
    }

    await fetchUser();
    setIsEditingUsername(false);
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
                    disabled={updateUsernameMutation.loading}
                  />
                  {updateUsernameMutation.error && (
                    <Alert variant='destructive'>
                      <AlertDescription>{updateUsernameMutation.error}</AlertDescription>
                    </Alert>
                  )}
                  <div className='flex gap-2'>
                    <Button onClick={handleSaveUsername} disabled={updateUsernameMutation.loading}>
                      {updateUsernameMutation.loading ? 'Saving...' : 'Save'}
                    </Button>
                    <Button onClick={handleCancelEdit} disabled={updateUsernameMutation.loading} variant='outline'>
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
