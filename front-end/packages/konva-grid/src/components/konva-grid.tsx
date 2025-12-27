'use client';

import { useRef, useEffect, useState } from 'react';
import { Stage, Layer } from 'react-konva';
import type { LayoutItem } from '../types';
import { GridRow } from './grid-row';
import { useGridDimensions } from '../hooks';

export type GridResponse = {
  grid: {
    cols: number;
    cellWidthIn: number;
  };
  rows: Array<{
    id: number;
    category: string | null;
    name: string;
    items: LayoutItem[];
  }>;
}

const DEFAULT_ROW_HEIGHT = 108;
const DEFAULT_ITEM_GAP = 4;

type KonvaGridProps = {
  gridData: GridResponse;
  rowLayouts: Record<number, LayoutItem[]>;
  width?: number;
  rowHeight?: number;
  itemGap?: number;
  showRowLabels?: boolean;
  onItemClick?: (item: LayoutItem, rowId: number) => void;
  editMode?: boolean;
  onLayoutChange?: (rowId: number, newLayout: LayoutItem[]) => void;
  onItemDelete?: (rowId: number, itemId: string) => void;
  selectedItemId?: string | null;
  onItemSelect?: (item: LayoutItem, rowId: number) => void;
}

export function KonvaGrid({
  gridData,
  rowLayouts,
  width: propWidth,
  rowHeight = DEFAULT_ROW_HEIGHT,
  itemGap = DEFAULT_ITEM_GAP,
  showRowLabels = false,
  onItemClick,
  editMode,
  onLayoutChange,
  onItemDelete,
  selectedItemId,
  onItemSelect,
}: KonvaGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(propWidth ?? 800);

  useEffect(() => {
    if (propWidth !== undefined) {
      setContainerWidth(propWidth);
      return;
    }

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [propWidth]);

  const { cellWidth, stageHeight } = useGridDimensions({
    width: containerWidth,
    cols: gridData.grid.cols,
    rowCount: gridData.rows.length,
    rowHeight,
    itemGap,
  });

  const handleItemDrag = (rowId: number, item: LayoutItem, newX: number) => {
    if (!onLayoutChange) return;

    const currentLayout = rowLayouts[rowId] ?? gridData.rows.find((r) => r.id === rowId)?.items ?? [];

    const updatedLayout = currentLayout.map((layoutItem) =>
      layoutItem.i === item.i
        ? { ...layoutItem, x: newX }
        : layoutItem
    );

    onLayoutChange(rowId, updatedLayout);
  };

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <Stage width={containerWidth} height={stageHeight}>
        <Layer>
          {gridData.rows.map((row, index) => {
            const items: LayoutItem[] =
              rowLayouts[row.id] && rowLayouts[row.id].length > 0
                ? rowLayouts[row.id]
                : row.items;

            const yOffset = index * (rowHeight + itemGap);

            return (
              <GridRow
                key={row.id}
                row={row}
                items={items}
                yOffset={yOffset}
                rowHeight={rowHeight}
                cellWidth={cellWidth}
                itemGap={itemGap}
                cols={gridData.grid.cols}
                showLabel={showRowLabels}
                onItemClick={
                  onItemClick
                    ? (item) => onItemClick(item, row.id)
                    : undefined
                }
                editMode={editMode}
                onItemDelete={
                  onItemDelete
                    ? (itemId) => onItemDelete(row.id, itemId)
                    : undefined
                }
                selectedItemId={selectedItemId}
                onItemSelect={
                  onItemSelect
                    ? (item) => onItemSelect(item, row.id)
                    : undefined
                }
                onItemDrag={
                  (item, newX) => handleItemDrag(row.id, item, newX)
                }
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
