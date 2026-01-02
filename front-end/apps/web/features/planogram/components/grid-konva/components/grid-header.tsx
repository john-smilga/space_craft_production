import type { SaveStatus } from '../utils/types';

type GridHeaderProps = {
  saveStatus: SaveStatus;
};

export function GridHeader({ saveStatus }: GridHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-4'>
      <h2 className='text-xl font-bold'>Shelf Layout</h2>
      {saveStatus === 'saving' && (
        <span className='text-sm text-muted-foreground animate-pulse font-medium'>
          Saving...
        </span>
      )}
      {saveStatus === 'deleting' && (
        <span className='text-sm text-muted-foreground animate-pulse font-medium'>
          Deleting...
        </span>
      )}
      {saveStatus === 'saved' && (
        <span className='text-sm text-green-600 dark:text-green-500 font-medium flex items-center gap-1'>
          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
          </svg>
          Layout saved
        </span>
      )}
      {saveStatus === 'error' && (
        <span className='text-sm text-destructive font-medium'>
          Failed to save
        </span>
      )}
    </div>
  );
}
