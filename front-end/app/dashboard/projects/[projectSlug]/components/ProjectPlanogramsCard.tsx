import Link from 'next/link';
import type { Planogram } from '@/types/planograms';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';
import PlanogramCard from '@/app/dashboard/planograms/components/PlanogramCard';

interface ProjectPlanogramsCardProps {
  projectSlug: string;
  planograms: Planogram[];
}

export default function ProjectPlanogramsCard({ projectSlug, planograms }: ProjectPlanogramsCardProps) {
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
                projectSlug={projectSlug}
                displayName={planogram.display?.name || null}
                seasonDisplay={planogram.season_display}
                categories={planogram.categories}
                categoryIds={planogram.category_ids}
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

