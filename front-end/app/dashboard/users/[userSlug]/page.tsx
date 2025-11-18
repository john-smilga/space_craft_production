'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFetch } from '@/hooks/useFetch';
import { useRequireAdmin } from '@/hooks/useRequireAdmin';
import { useMutation } from '@/hooks/useMutation';
import api from '@/lib/axios';
import type { User } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminOnly } from '@/components/AdminOnly';
import { formatDate } from '@/lib/utils';

interface UserResponse {
  user: User;
}

interface UserFieldProps {
  label: string;
  children: React.ReactNode;
}

function UserField({ label, children }: UserFieldProps) {
  return (
    <div>
      <label className='text-sm font-medium text-muted-foreground'>{label}</label>
      <p className='text-lg'>{children}</p>
    </div>
  );
}

export default function UserDetailPage() {
  const isAdmin = useRequireAdmin();
  const router = useRouter();
  const params = useParams();
  const userSlug = params?.userSlug as string;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isAdmin) {
    return null; // Redirecting via useRequireAdmin
  }

  const { data, loading, error } = useFetch<UserResponse>(userSlug ? `/users/${userSlug}/` : null);
  const user = data?.user || null;

  const deleteMutation = useMutation<void, void>(
    async () => {
      await api.delete(`/users/${userSlug}/`);
    },
    { toastResource: 'user' }
  );

  const handleDelete = async () => {
    const result = await deleteMutation.mutate(undefined);
    if (!result.error) {
      router.push('/dashboard/users');
    } else {
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return <div className='text-center py-8'>Loading...</div>;
  }

  const handleDeleteClick = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    await handleDelete();
  };

  if (error && !user) {
    return (
      <Alert variant='destructive' className='mb-4'>
        <AlertDescription>{error}</AlertDescription>
        <Button onClick={() => router.push('/dashboard/users')} variant='outline' className='mt-4'>
          Back to Users
        </Button>
      </Alert>
    );
  }

  return (
    <>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>User Details</h1>
      </div>

      {(error || deleteMutation.error) && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{error || deleteMutation.error}</AlertDescription>
        </Alert>
      )}

      {user && (
        <Card>
          <CardContent className='p-6'>
            <div className='space-y-4'>
              <UserField label='Username'>{user.username}</UserField>
              <UserField label='Email'>{user.email}</UserField>
              <UserField label='Role'>
                <span className='capitalize'>{user.role}</span>
              </UserField>
              <UserField label='Date Joined'>{formatDate(user.date_joined)}</UserField>
              <UserField label='User ID'>{user.id}</UserField>
            </div>

            <AdminOnly>
              <div className='mt-8 pt-6 border-t border-border'>
                {!showDeleteConfirm ? (
                  <Button onClick={handleDeleteClick} variant='destructive'>
                    Delete User
                  </Button>
                ) : (
                  <div className='space-y-4'>
                    <p className='text-destructive font-medium'>Are you sure you want to delete this user? This action cannot be undone.</p>
                    <div className='flex gap-2'>
                      <Button onClick={handleDelete} disabled={deleteMutation.loading} variant='destructive'>
                        {deleteMutation.loading ? 'Deleting...' : 'Confirm Delete'}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                          deleteMutation.reset();
                        }}
                        disabled={deleteMutation.loading}
                        variant='outline'
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </AdminOnly>
          </CardContent>
        </Card>
      )}
    </>
  );
}
