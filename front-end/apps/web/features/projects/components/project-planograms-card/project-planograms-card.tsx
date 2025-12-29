import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import { PlanogramCard } from '@/features/planogram-old';

type PlanogramListType = z.infer<typeof schemas.PlanogramList>;

type ProjectPlanogramsCardProps = {
  projectSlug: string;
  planograms: PlanogramListType[];
}

export function ProjectPlanogramsCard({ projectSlug, planograms }: ProjectPlanogramsCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <CardTitle>Planograms</CardTitle>
          <Button asChild size='sm'>
            <Link href={`/dashboard/projects/${projectSlug}/planograms/new`}>+ Create Planogram</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {planograms.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {planograms.map((planogram) => (
              <PlanogramCard
                key={planogram.id}
                name={planogram.name}
                slug={planogram.slug}
                project_name={planogram.project_name}
                project_slug={projectSlug}
                display_name={planogram.display_name}
                seasonDisplay={planogram.season || ''}
                categories={planogram.categories}
                category_ids={
                  Array.isArray(planogram.category_ids)
                    ? (planogram.category_ids as number[])
                    : []
                }
              />
            ))}
          </div>
        ) : (
          <EmptyState message='No planograms yet' />
        )}
      </CardContent>
    </Card>
  );
}

