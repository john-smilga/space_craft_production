'use client';

import { useParams } from 'next/navigation';
import { StoreForm } from '@/features/stores';

export default function EditStorePage() {
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  return <StoreForm mode='edit' storeSlug={storeSlug} />;
}
