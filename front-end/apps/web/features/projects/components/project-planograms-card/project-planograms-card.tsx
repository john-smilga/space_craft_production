import Link from 'next/link';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EmptyState from '@/components/EmptyState';

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
              <Card key={planogram.id} className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <CardTitle className='text-lg'>
                    <Link
                      href={`/dashboard/projects/${projectSlug}/planograms/${planogram.slug}`}
                      className='hover:text-primary'
                    >
                      {planogram.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='text-sm space-y-1'>
                    {planogram.display_name && (
                      <p className='text-muted-foreground'>Display: {planogram.display_name}</p>
                    )}
                    {planogram.season && (
                      <p className='text-muted-foreground'>Season: {planogram.season}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState message='No planograms yet' />
        )}
      </CardContent>
    </Card>
  );
}

