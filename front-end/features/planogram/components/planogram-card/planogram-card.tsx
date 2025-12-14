import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

type PlanogramType = z.infer<typeof schemas.Planogram>;

interface PlanogramCardProps {
  name: string;
  slug: string;
  projectSlug: string;
  displayName: string | null;
  seasonDisplay: string;
  categories: PlanogramType['categories'];
  categoryIds: number[];
  projectName?: string;
}

export function PlanogramCard({
  name,
  slug,
  projectName,
  projectSlug,
  displayName,
  seasonDisplay,
  categories,
  categoryIds,
}: PlanogramCardProps) {
  return (
    <Link href={`/dashboard/projects/${projectSlug}/planograms/${slug}`} className='block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-xl font-semibold'>{name}</h3>
      </div>
      <div className='space-y-1 text-sm text-muted-foreground'>
        {projectName && (
          <p>
            <span className='font-medium text-foreground'>Project:</span> {projectName}
          </p>
        )}
        <p>
          <span className='font-medium text-foreground'>Display:</span> {displayName || 'N/A'}
        </p>
        <p>
          <span className='font-medium text-foreground'>Season:</span> <span className='capitalize'>{seasonDisplay}</span>
        </p>
        <p>
          <span className='font-medium text-foreground'>Categories:</span>{' '}
          {categories && categories.length > 0 ? (
            <span>{categories.map((cat) => cat.name).join(', ')}</span>
          ) : (
            <span>{categoryIds.length} selected</span>
          )}
        </p>
      </div>
    </Link>
  );
}

