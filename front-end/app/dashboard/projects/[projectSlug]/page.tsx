'use client';

import { useParams } from 'next/navigation';
import { ProjectDetail } from '@/features/projects';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  return <ProjectDetail projectSlug={projectSlug} />;
}
