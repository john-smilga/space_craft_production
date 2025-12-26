'use client';

import { useRouter } from 'next/navigation';
import { useRequireAdmin } from '@/features/auth';
import EmptyState from '@/components/EmptyState';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDate } from '@/lib/utils';
import { useUsersQuery } from '../../queries';

export function UserList() {
  useRequireAdmin();
  const router = useRouter();
  const { data, isLoading, error } = useUsersQuery();
  const users = data || [];

  const handleUserClick = (userSlug: string) => {
    router.push(`/dashboard/users/${userSlug}`);
  };

  return (
    <>
      <h1 className='text-3xl font-bold mb-8'>Users</h1>

      {isLoading ? (
        <div className='text-center py-8'>Loading...</div>
      ) : error ? (
        <Alert variant='destructive' className='mb-4'>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      ) : users.length === 0 ? (
        <EmptyState message='No users found' />
      ) : (
        <Card>
          <CardContent className='p-0'>
            <ul className='divide-y divide-border'>
              {users.map((userItem) => (
                <li key={userItem.id} onClick={() => handleUserClick(userItem.slug)} className='px-6 py-4 hover:bg-accent cursor-pointer transition-colors'>
                  <div className='flex items-center justify-between'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-4'>
                        <div>
                          <p className='text-lg font-medium'>{userItem.username}</p>
                          <p className='text-sm text-muted-foreground'>{userItem.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className='text-sm text-muted-foreground'>Joined: {formatDate(userItem.date_joined || '')}</div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}

