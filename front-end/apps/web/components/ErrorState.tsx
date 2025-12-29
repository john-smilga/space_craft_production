import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type ErrorStateProps = {
  error: Error | string | unknown;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
};

export function ErrorState({
  error,
  onRetry,
  onBack,
  className,
}: ErrorStateProps) {
  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected error occurred';

  return (
    <Alert variant='destructive' className={cn('mb-4', className)}>
      <AlertDescription>{errorMessage}</AlertDescription>
      {(onRetry || onBack) && (
        <div className='mt-4 flex gap-2'>
          {onRetry && (
            <Button onClick={onRetry} variant='outline' size='sm'>
              Try Again
            </Button>
          )}
          {onBack && (
            <Button onClick={onBack} variant='outline' size='sm'>
              Go Back
            </Button>
          )}
        </div>
      )}
    </Alert>
  );
}
