import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ProjectErrorAlertProps {
  error: string;
}

export default function ProjectErrorAlert({ error }: ProjectErrorAlertProps) {
  const router = useRouter();

  return (
    <Alert variant='destructive' className='mb-4'>
      <AlertDescription>{error}</AlertDescription>
      <Button onClick={() => router.push('/dashboard/projects')} variant='outline' className='mt-4'>
        Back to Projects
      </Button>
    </Alert>
  );
}

