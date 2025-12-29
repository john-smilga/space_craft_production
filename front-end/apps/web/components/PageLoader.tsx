import { cn } from '@/lib/utils';

type PageLoaderProps = {
  message?: string;
  className?: string;
};

export function PageLoader({
  message = 'Loading...',
  className,
}: PageLoaderProps) {
  return (
    <div className={cn('text-center py-8', className)}>
      <p className='text-muted-foreground'>{message}</p>
    </div>
  );
}
