'use client';

import { useParams } from 'next/navigation';
import { EditStoreForm } from '@/features/stores';

export default function EditStorePage() {
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  return <EditStoreForm storeSlug={storeSlug} />;
}
