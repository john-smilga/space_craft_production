'use client';

import { useParams } from 'next/navigation';
import { UserDetail } from '@/features/users';

export default function UserDetailPage() {
  const params = useParams();
  const userSlug = params?.userSlug as string;

  return <UserDetail userSlug={userSlug} />;
}
