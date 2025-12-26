import Link from 'next/link';

interface StoreCardProps {
  name: string;
  store_code: string;
  slug: string;
  address?: string;
}

export function StoreCard({ name, store_code, slug, address }: StoreCardProps) {
  return (
    <Link href={`/dashboard/stores/${slug}`} className='block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all'>
      <h3 className='text-xl font-semibold mb-1'>{name}</h3>
      <p className='text-sm text-muted-foreground mb-2'>{store_code}</p>
      {address && <p className='text-sm text-muted-foreground line-clamp-2'>{address}</p>}
    </Link>
  );
}

