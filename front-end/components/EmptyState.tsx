import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <Card className='p-12'>
      <CardContent className='p-0'>
        <p className='text-muted-foreground text-lg font-medium text-center'>{message}</p>
      </CardContent>
    </Card>
  );
}
