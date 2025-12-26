'use client';

import { useParams } from 'next/navigation';
import { ProjectForm } from '@/features/projects';

export default function EditProjectPage() {
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  return <ProjectForm mode='edit' projectSlug={projectSlug} />;
}
