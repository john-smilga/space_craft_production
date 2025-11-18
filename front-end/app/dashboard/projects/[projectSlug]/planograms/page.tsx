'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ProjectPlanogramsPage() {
  const router = useRouter();
  const params = useParams();
  const projectSlug = params?.projectSlug as string;

  useEffect(() => {
    // Redirect to the project detail page where planograms are displayed
    if (projectSlug) {
      router.replace(`/dashboard/projects/${projectSlug}`);
    }
  }, [projectSlug, router]);

  return null;
}
