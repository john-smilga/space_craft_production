'use client';

import { useRef } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import { useLayoutQuery } from '@/features/planogram/queries';
import { GridItem } from './components/grid-item';
import { GridLoadingState } from './components/grid-loading-state';
import { GridErrorState } from './components/grid-error-state';
import { GridHeader } from './components/grid-header';
import { useContainerResize } from './hooks/use-container-resize';
import { useLayoutState } from './hooks/use-layout-state';
import { useGridActions } from './hooks/use-grid-actions';
import { flattenItemsWithPixels } from './utils/grid-calculations';
import { ROW_HEIGHT } from './utils/types';

type GridKonvaProps = {
  planogramSlug: string;
};

export function GridKonva({ planogramSlug }: GridKonvaProps) {
  const { data: layout, isLoading, error, dataUpdatedAt } = useLayoutQuery(planogramSlug);

  const containerRef = useRef<HTMLDivElement>(null);
  const [localLayout, setLocalLayout] = useLayoutState(layout, dataUpdatedAt);
  const stageWidth = useContainerResize(containerRef, !!localLayout);

  const cellWidth = localLayout ? stageWidth / localLayout.grid.cols : 0;

  const { handleDragEnd, handleRemoveItem, saveStatus } = useGridActions(
    planogramSlug,
    localLayout,
    setLocalLayout,
    cellWidth
  );

  if (isLoading) {
    return <GridLoadingState />;
  }

  if (error) {
    return <GridErrorState error={error} />;
  }

  if (!localLayout) {
    return null;
  }

  const stageHeight = localLayout.rows.length * ROW_HEIGHT;
  const flattenedItems = flattenItemsWithPixels(localLayout, cellWidth);

  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <GridHeader saveStatus={saveStatus} />

      <div ref={containerRef} className='w-full'>
        {stageWidth > 0 ? (
          <Stage width={stageWidth} height={stageHeight}>
            <Layer>
              {localLayout.rows.map((row, index) => (
                <Line
                  key={`divider-${row.id}`}
                  points={[0, index * ROW_HEIGHT, stageWidth, index * ROW_HEIGHT]}
                  stroke='#e5e7eb'
                  strokeWidth={2}
                />
              ))}

              {localLayout.rows.map((row, index) => (
                <Text
                  key={`label-${row.id}`}
                  x={8}
                  y={index * ROW_HEIGHT + 8}
                  text={row.category ? `${row.name} (${row.category})` : row.name}
                  fontSize={12}
                  fontStyle='500'
                  fill='#6b7280'
                />
              ))}

              {flattenedItems.map((item) => (
                <GridItem
                  key={item.i}
                  item={item}
                  cellWidth={cellWidth}
                  onDragEnd={handleDragEnd}
                  onRemove={handleRemoveItem}
                />
              ))}
            </Layer>
          </Stage>
        ) : (
          <div className='text-muted-foreground'>Waiting for container dimensions...</div>
        )}
      </div>
    </div>
  );
}
