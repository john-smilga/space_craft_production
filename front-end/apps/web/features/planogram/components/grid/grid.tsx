'use client';

import { useState, useEffect } from 'react';
import GridLayout, { WidthProvider, type Layout as RGLLayout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { useDebouncedCallback } from 'use-debounce';
import { useLayoutQuery, useSaveLayoutMutation } from '@/features/planogram/queries';
import type { z } from 'zod';
import type { schemas } from '@/lib/generated/api-schemas';

type Layout = z.infer<typeof schemas.Layout>;
type LayoutItem = z.infer<typeof schemas.LayoutItem>;

const GridLayoutWithProvider = WidthProvider(GridLayout);

type GridProps = {
  planogramSlug: string;
};

export function Grid({ planogramSlug }: GridProps) {
  const { data: layout, isLoading, error } = useLayoutQuery(planogramSlug);

  // Local layout state for optimistic updates
  const [localLayout, setLocalLayout] = useState<Layout | null>(null);

  // Sync local state when query data changes
  useEffect(() => {
    if (layout) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Syncing server state to local state for optimistic updates
      setLocalLayout(layout);
    }
  }, [layout]);

  // Saving state for UI feedback
  const [isSaving, setIsSaving] = useState(false);

  // Save layout mutation
  const saveLayoutMutation = useSaveLayoutMutation();

  // Debounced save function
  const debouncedSave = useDebouncedCallback(
    (layoutToSave: Layout) => {
      setIsSaving(true);

      saveLayoutMutation.mutate(
        {
          slug: planogramSlug,
          layout: {
            grid: layoutToSave.grid,
            rows: layoutToSave.rows,
          },
        },
        {
          onSettled: () => {
            setIsSaving(false);
          },
        }
      );
    },
    1500 // 1.5 second delay
  );

  // Handle drag stop - update local state and trigger debounced save
  const handleDragStop = (rowId: number, newLayout: RGLLayout[]) => {
    if (!localLayout) return;

    const updatedRows = localLayout.rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          items: newLayout.map((item) => {
            const originalItem = row.items.find((i) => i.i === item.i);
            return {
              ...originalItem!,
              x: item.x,
              y: item.y,
              w: item.w,
              h: item.h,
            };
          }),
        };
      }
      return row;
    });

    const updatedLayout = {
      ...localLayout,
      rows: updatedRows,
    };

    setLocalLayout(updatedLayout);
    debouncedSave(updatedLayout);
  };

  // Handle remove item - filter out item and trigger debounced save
  const handleRemoveItem = (rowId: number, itemId: string) => {
    if (!localLayout) return;

    const updatedRows = localLayout.rows.map((row) => {
      if (row.id === rowId) {
        return {
          ...row,
          items: row.items.filter((item) => item.i !== itemId),
        };
      }
      return row;
    });

    const updatedLayout = {
      ...localLayout,
      rows: updatedRows,
    };

    setLocalLayout(updatedLayout);
    debouncedSave(updatedLayout);
  };

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

  if (!localLayout) {
    return null;
  }

  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Shelf Layout</h2>
        {isSaving && (
          <span className='text-sm text-muted-foreground animate-pulse'>
            Saving...
          </span>
        )}
      </div>

      {localLayout.rows.map((row) => (
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
            cols={localLayout.grid.cols}
            rowHeight={100}
            isResizable={false}
            isDraggable={true}
            margin={[4, 4]}
            onDragStop={(newLayout) => handleDragStop(row.id, newLayout)}
          >
            {row.items.map((item: LayoutItem) => {
              const bgColor = item.meta.color || '#9ca3af';
              const widthIn = item.meta.pack_width_in;

              return (
                <div
                  key={item.i}
                  className='border-2 rounded p-2 flex flex-col items-center justify-center text-sm text-center font-bold text-white drop-shadow-md relative cursor-pointer'
                  style={{ backgroundColor: bgColor, borderColor: bgColor }}
                >
                  <button
                    onClick={() => handleRemoveItem(row.id, item.i)}
                    className='absolute top-1 right-1 w-5 h-5 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full text-white text-xs leading-none transition-all cursor-pointer'
                    aria-label='Remove item'
                  >
                    ×
                  </button>
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
