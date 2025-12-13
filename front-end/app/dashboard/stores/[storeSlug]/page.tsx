'use client';

import { useParams } from 'next/navigation';
import { StoreDetail } from '@/features/stores';

export default function StoreDetailPage() {
  const params = useParams();
  const storeSlug = params?.storeSlug as string;

  return <StoreDetail storeSlug={storeSlug} />;
}
