'use client';

import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useLayoutQuery } from '@/features/planogram/queries';
import type { z } from 'zod';
import type { schemas } from '@/lib/generated/api-schemas';

type LayoutItem = z.infer<typeof schemas.LayoutItem>;

const GridLayoutWithProvider = WidthProvider(GridLayout);

type GridProps = {
  planogramSlug: string;
};

export function Grid({ planogramSlug }: GridProps) {
  const { data: layout, isLoading, error } = useLayoutQuery(planogramSlug);

  if (isLoading) {
    return (
      <div className='bg-card p-6 rounded-lg shadow-md'>
        <div className='h-8 w-48 bg-muted animate-pulse rounded mb-4' />
        <div className='h-96 bg-muted animate-pulse rounded' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-card p-6 rounded-lg shadow-md'>
        <h2 className='text-xl font-bold mb-2'>Layout Error</h2>
        <p className='text-destructive'>
          {error instanceof Error ? error.message : 'Failed to load layout'}
        </p>
      </div>
    );
  }

  if (!layout) {
    return null;
  }

  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Shelf Layout</h2>
      </div>

      {layout.rows.map((row) => (
        <div key={row.id} className='mb-6'>
          <div className='text-sm font-medium text-muted-foreground mb-2'>
            {row.name}
            {row.category && (
              <span className='ml-2 text-xs'>({row.category})</span>
            )}
          </div>

          <GridLayoutWithProvider
            className='layout border-2 border-border bg-muted rounded'
            layout={row.items}
            cols={layout.grid.cols}
            rowHeight={100}
            isResizable={false}
            isDraggable={false}
            margin={[4, 4]}
          >
            {row.items.map((item: LayoutItem) => {
              const bgColor = item.meta.color || '#9ca3af';
              const widthIn = item.meta.pack_width_in;

              return (
                <div
                  key={item.i}
                  className='border-2 rounded p-2 flex flex-col items-center justify-center text-sm text-center font-bold text-white drop-shadow-md'
                  style={{ backgroundColor: bgColor, borderColor: bgColor }}
                >
                  <div className='flex-1 flex items-center justify-center'>
                    {item.meta.name}
                  </div>
                  {widthIn && (
                    <div className='text-[10px] font-normal opacity-90 mt-1'>
                      {widthIn.toFixed(1)}&quot;
                    </div>
                  )}
                </div>
              );
            })}
          </GridLayoutWithProvider>
        </div>
      ))}
    </div>
  );
}
