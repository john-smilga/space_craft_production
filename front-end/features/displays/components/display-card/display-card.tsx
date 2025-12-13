import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { Display } from '../../types';

interface DisplayCardProps {
  display: Display;
}

export function DisplayCard({ display }: DisplayCardProps) {
  return (
    <Link href={`/dashboard/displays/${display.slug}`} className='block'>
      <Card className='p-6 transition-all hover:border-primary hover:shadow-md'>
        <CardContent className='p-0'>
          <div className='mb-2'>
            <h3 className='text-xl font-semibold'>{display.name}</h3>
          </div>
          <p className='text-sm text-muted-foreground capitalize mb-2'>{display.type_display}</p>
          <p className='text-sm'>
            {display.width_in}&quot; × {display.height_in}&quot; × {display.depth_in}&quot; | {display.shelf_count} shelf{display.shelf_count !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

