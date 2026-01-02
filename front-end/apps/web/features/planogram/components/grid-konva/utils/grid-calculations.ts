import type { Layout, FlattenedItem } from './types';
import { ROW_HEIGHT, MARGIN } from './types';

export function flattenItemsWithPixels(
  layout: Layout,
  cellWidth: number
): FlattenedItem[] {
  return layout.rows.flatMap((row, rowIndex) =>
    row.items.map((item) => ({
      ...item,
      rowId: row.id,
      rowIndex,
      pixelX: item.x * cellWidth + MARGIN,
      pixelY: rowIndex * ROW_HEIGHT + MARGIN,
    }))
  );
}

export function pixelToGridCoords(
  pixelX: number,
  pixelY: number,
  cellWidth: number
): { gridX: number; rowIndex: number } {
  return {
    gridX: Math.round((pixelX - MARGIN) / cellWidth),
    rowIndex: Math.floor((pixelY - MARGIN) / ROW_HEIGHT),
  };
}

export function clampPosition(
  gridX: number,
  rowIndex: number,
  itemWidth: number,
  gridCols: number,
  maxRowIndex: number
): { clampedX: number; clampedRowIndex: number } {
  return {
    clampedX: Math.max(0, Math.min(gridX, gridCols - itemWidth)),
    clampedRowIndex: Math.max(0, Math.min(rowIndex, maxRowIndex)),
  };
}
