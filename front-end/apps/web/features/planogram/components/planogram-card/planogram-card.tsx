import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

type PlanogramListType = z.infer<typeof schemas.PlanogramList>;

type PlanogramCardProps = Pick<
  PlanogramListType,
  'name' | 'slug' | 'project_name' | 'project_slug' | 'display_name' | 'categories' | 'category_ids'
> & {
  seasonDisplay: string;
}

export function PlanogramCard({
  name,
  slug,
  project_name,
  project_slug,
  display_name,
  seasonDisplay,
  categories,
  category_ids,
}: PlanogramCardProps) {
  return (
    <Link href={`/dashboard/projects/${project_slug}/planograms/${slug}`} className='block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all'>
      <div className='flex justify-between items-start mb-2'>
        <h3 className='text-xl font-semibold'>{name}</h3>
      </div>
      <div className='space-y-1 text-sm text-muted-foreground'>
        {project_name && (
          <p>
            <span className='font-medium text-foreground'>Project:</span> {project_name}
          </p>
        )}
        <p>
          <span className='font-medium text-foreground'>Display:</span> {display_name || 'N/A'}
        </p>
        <p>
          <span className='font-medium text-foreground'>Season:</span> <span className='capitalize'>{seasonDisplay}</span>
        </p>
        <p>
          <span className='font-medium text-foreground'>Categories:</span>{' '}
          {categories && categories.length > 0 ? (
            <span>{categories.map((cat) => cat.name).join(', ')}</span>
          ) : (
            <span>{Array.isArray(category_ids) ? category_ids.length : 0} selected</span>
          )}
        </p>
      </div>
    </Link>
  );
}
