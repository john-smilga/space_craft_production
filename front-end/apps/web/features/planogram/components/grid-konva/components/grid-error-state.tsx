type GridErrorStateProps = {
  error: Error | unknown;
};

export function GridErrorState({ error }: GridErrorStateProps) {
  const errorMessage =
    error instanceof Error ? error.message : 'Failed to load layout';

  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-bold mb-2'>Layout Error</h2>
      <p className='text-destructive'>{errorMessage}</p>
    </div>
  );
}
