'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRequireAdmin } from '@/features/auth';
import { PageLoader } from '@/components/PageLoader';
import { ErrorState } from '@/components/ErrorState';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AdminOnly } from '@/components/AdminOnly';
import { formatDate } from '@/lib/utils';
import { useUserQuery, useDeleteUserMutation } from '../../queries';

type UserFieldProps = {
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

type UserDetailProps = {
  userSlug: string;
}

export function UserDetail({ userSlug }: UserDetailProps) {
  useRequireAdmin();
  const router = useRouter();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { data: user, isLoading, error } = useUserQuery(userSlug);

  const deleteMutation = useDeleteUserMutation(userSlug);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      router.push('/dashboard/users');
    } catch {
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteClick = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    await handleDelete();
  };

  if (isLoading) {
    return <PageLoader message='Loading user details...' />;
  }

  if (error && !user) {
    return (
      <ErrorState error={error} onBack={() => router.push('/dashboard/users')} />
    );
  }

  return (
    <>
      <div className='mb-6'>
        <h1 className='text-3xl font-bold'>User Details</h1>
      </div>

      {deleteMutation.isError && (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{deleteMutation.error?.message}</AlertDescription>
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
              <UserField label='Date Joined'>{formatDate(user.date_joined || '')}</UserField>
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
                      <Button onClick={handleDelete} disabled={deleteMutation.isPending} variant='destructive'>
                        {deleteMutation.isPending ? 'Deleting...' : 'Confirm Delete'}
                      </Button>
                      <Button
                        onClick={() => {
                          setShowDeleteConfirm(false);
                        }}
                        disabled={deleteMutation.isPending}
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

