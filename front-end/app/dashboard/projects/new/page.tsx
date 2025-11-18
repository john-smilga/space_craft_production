'use client';

import CreateProjectForm from '@/app/dashboard/projects/components/CreateProjectForm';

export default function CreateProjectPage() {
  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Create Project</h1>
        <p className='text-muted-foreground'>Add a new project to a store</p>
      </div>

      <CreateProjectForm />
    </>
  );
}
