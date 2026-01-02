import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useSaveLayoutMutation } from '@/features/planogram/queries';
import type { Layout, FlattenedItem, SaveStatus } from '../utils/types';
import { pixelToGridCoords, clampPosition } from '../utils/grid-calculations';

export function useGridActions(
  planogramSlug: string,
  localLayout: Layout | null,
  setLocalLayout: (layout: Layout) => void,
  cellWidth: number
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const saveLayoutMutation = useSaveLayoutMutation();

  const debouncedSave = useDebouncedCallback(
    (layoutToSave: Layout) => {
      saveLayoutMutation.mutate(
        {
          slug: planogramSlug,
          layout: {
            grid: layoutToSave.grid,
            rows: layoutToSave.rows,
          },
        },
        {
          onSuccess: () => {
            setSaveStatus('saved');
            setTimeout(() => {
              setSaveStatus('idle');
            }, 2000);
          },
          onError: () => {
            setSaveStatus('error');
            setTimeout(() => {
              setSaveStatus('idle');
            }, 3000);
          },
        }
      );
    },
    1500
  );

  const handleDragEnd = (item: FlattenedItem, newPixelX: number, newPixelY: number) => {
    if (!localLayout) return;

    const { gridX, rowIndex } = pixelToGridCoords(newPixelX, newPixelY, cellWidth);
    const { clampedX, clampedRowIndex } = clampPosition(
      gridX,
      rowIndex,
      item.w,
      localLayout.grid.cols,
      localLayout.rows.length - 1
    );

    const newRow = localLayout.rows[clampedRowIndex];
    if (!newRow) return;

    const updatedRows = localLayout.rows.map((row, rowIndex) => {
      if (rowIndex === clampedRowIndex) {
        const itemExists = row.items.some((i) => i.i === item.i);
        if (itemExists) {
          return {
            ...row,
            items: row.items.map((i) =>
              i.i === item.i ? { ...i, x: clampedX, y: 0 } : i
            ),
          };
        }
        return {
          ...row,
          items: [...row.items, { ...item, x: clampedX, y: 0 }],
        };
      }
      if (row.id === item.rowId) {
        return {
          ...row,
          items: row.items.filter((i) => i.i !== item.i),
        };
      }
      return row;
    });

    const updatedLayout = {
      ...localLayout,
      rows: updatedRows,
    };

    setLocalLayout(updatedLayout);
    setSaveStatus('saving');
    debouncedSave(updatedLayout);
  };

  const handleRemoveItem = (item: FlattenedItem) => {
    if (!localLayout) return;

    const updatedRows = localLayout.rows.map((row) => ({
      ...row,
      items: row.items.filter((i) => i.i !== item.i),
    }));

    const updatedLayout = {
      ...localLayout,
      rows: updatedRows,
    };

    setLocalLayout(updatedLayout);
    setSaveStatus('deleting');
    debouncedSave(updatedLayout);
  };

  return {
    handleDragEnd,
    handleRemoveItem,
    saveStatus,
  };
}
