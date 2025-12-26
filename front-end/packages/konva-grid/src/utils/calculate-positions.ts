import type { LayoutItem } from '../types';

interface CalculatePositionsParams {
  items: LayoutItem[];
  cellWidth: number;
  itemGap: number;
  rowHeight: number;
}

interface ItemPosition {
  item: LayoutItem;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function calculateItemPositions({
  items,
  cellWidth,
  itemGap,
  rowHeight,
}: CalculatePositionsParams): ItemPosition[] {
  return items.map((item) => {
    const x = item.x * cellWidth + itemGap;
    const y = itemGap;
    const width = item.w * cellWidth - itemGap * 2;
    const height = rowHeight - itemGap * 2;

    return {
      item,
      x,
      y,
      width: Math.max(width, 0),
      height: Math.max(height, 0),
    };
  });
}

interface CollisionCheckParams {
  item: LayoutItem;
  newX: number;
  otherItems: LayoutItem[];
}

interface CollisionResult {
  hasCollision: boolean;
  collidingItems: LayoutItem[];
}

export function checkItemCollision({
  item,
  newX,
  otherItems,
}: CollisionCheckParams): CollisionResult {
  const collidingItems: LayoutItem[] = [];

  for (const otherItem of otherItems) {
    if (otherItem.i === item.i) continue;

    const itemEnd = newX + item.w;
    const otherEnd = otherItem.x + otherItem.w;

    const hasOverlap = newX < otherEnd && itemEnd > otherItem.x;

    if (hasOverlap) {
      collidingItems.push(otherItem);
    }
  }

  return {
    hasCollision: collidingItems.length > 0,
    collidingItems,
  };
}

interface PixelToGridParams {
  pixelX: number;
  cellWidth: number;
  itemGap: number;
}

export function pixelToGridPosition({
  pixelX,
  cellWidth,
  itemGap,
}: PixelToGridParams): number {
  return Math.round((pixelX - itemGap) / cellWidth);
}
