import { Label } from '@/components/ui/label';

interface ProjectDisplayProps {
  projectName: string | null;
}

export default function ProjectDisplay({ projectName }: ProjectDisplayProps) {
  return (
    <div className='space-y-2'>
      <Label>Project</Label>
      <div className='px-3 py-2 bg-muted border rounded-lg'>{projectName || 'Loading...'}</div>
    </div>
  );
}
