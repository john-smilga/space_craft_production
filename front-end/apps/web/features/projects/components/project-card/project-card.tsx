import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { ProjectListType } from '../../types';

interface ProjectCardProps {
  project: ProjectListType;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/dashboard/projects/${project.slug}`} className='block'>
      <Card className='p-6 hover:border-primary hover:shadow-md transition-all'>
        <CardContent className='p-0'>
          <h3 className='text-xl font-semibold mb-1'>{project.name}</h3>
          {project.store_name ? (
            <>
              <p className='text-sm text-muted-foreground mb-2'>{project.store_name}</p>
              <p className='text-sm text-foreground'>{project.store_code}</p>
            </>
          ) : (
            <p className='text-sm text-destructive mb-2'>Store not found</p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

