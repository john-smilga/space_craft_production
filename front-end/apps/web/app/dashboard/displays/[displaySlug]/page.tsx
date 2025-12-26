'use client';

import { useParams } from 'next/navigation';
import { DisplayDetail } from '@/features/displays';

export default function DisplayDetailPage() {
  const params = useParams();
  const displaySlug = params?.displaySlug as string;

  return <DisplayDetail displaySlug={displaySlug} />;
}
