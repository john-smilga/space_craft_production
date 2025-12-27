import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Derive props from StoreList (list view) + optional address from Store (detail view)
type StoreCardProps = Pick<
  z.infer<typeof schemas.StoreList>,
  'name' | 'store_code' | 'slug'
> & {
  address?: string; // From Store schema (detail), optional for list views
};

export function StoreCard({ name, store_code, slug, address }: StoreCardProps) {
  return (
    <Link href={`/dashboard/stores/${slug}`} className='block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all'>
      <h3 className='text-xl font-semibold mb-1'>{name}</h3>
      <p className='text-sm text-muted-foreground mb-2'>{store_code}</p>
      {address && <p className='text-sm text-muted-foreground line-clamp-2'>{address}</p>}
    </Link>
  );
}

