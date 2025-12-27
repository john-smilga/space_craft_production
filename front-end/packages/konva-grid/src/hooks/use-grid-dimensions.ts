import { useMemo } from 'react';

type UseGridDimensionsParams = {
  width: number;
  cols: number;
  rowCount: number;
  rowHeight: number;
  itemGap: number;
}

type GridDimensions = {
  cellWidth: number;
  stageHeight: number;
}

export function useGridDimensions({
  width,
  cols,
  rowCount,
  rowHeight,
  itemGap,
}: UseGridDimensionsParams): GridDimensions {
  return useMemo(() => {
    const cellWidth = width / cols;
    const stageHeight = rowCount * rowHeight + (rowCount - 1) * itemGap;

    return {
      cellWidth,
      stageHeight,
    };
  }, [width, cols, rowCount, rowHeight, itemGap]);
}
