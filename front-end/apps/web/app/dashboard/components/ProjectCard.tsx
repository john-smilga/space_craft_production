import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';

// Derive props from ProjectList API schema
type ProjectCardProps = Pick<z.infer<typeof schemas.ProjectList>, 'id' | 'name'> & {
  pogCount?: number; // Frontend computed count
}

export default function ProjectCard({ id, name, pogCount = 0 }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${id}`} className='block bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all'>
      <h3 className='text-xl font-semibold mb-2'>{name}</h3>
      <p className='text-muted-foreground text-sm'>
        {pogCount} planogram{pogCount !== 1 ? 's' : ''}
      </p>
    </Link>
  );
}
