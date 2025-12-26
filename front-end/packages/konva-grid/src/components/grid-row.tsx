import { Group, Rect, Text } from 'react-konva';
import type { LayoutItem } from '../types';
import { GridItem } from './grid-item';
import { calculateItemPositions } from '../utils';

const ROW_BG_COLOR = '#f4f4f5';
const ROW_BORDER_COLOR = '#e4e4e7';

interface GridRowData {
  id: number;
  category: string | null;
  name: string;
  items: LayoutItem[];
}

interface GridRowProps {
  row: GridRowData;
  items: LayoutItem[];
  yOffset: number;
  rowHeight: number;
  cellWidth: number;
  itemGap: number;
  cols: number;
  showLabel: boolean;
  onItemClick?: (item: LayoutItem) => void;
  editMode?: boolean;
  onItemDelete?: (itemId: string) => void;
  selectedItemId?: string | null;
  onItemSelect?: (item: LayoutItem) => void;
  onItemDrag?: (item: LayoutItem, newX: number) => void;
}

export function GridRow({
  row,
  items,
  yOffset,
  rowHeight,
  cellWidth,
  itemGap,
  cols,
  showLabel,
  onItemClick,
  editMode,
  onItemDelete,
  selectedItemId,
  onItemSelect,
  onItemDrag,
}: GridRowProps) {
  const rowWidth = cols * cellWidth;

  const itemPositions = calculateItemPositions({
    items,
    cellWidth,
    itemGap,
    rowHeight,
  });

  return (
    <Group y={yOffset}>
      <Rect
        x={0}
        y={0}
        width={rowWidth}
        height={rowHeight}
        fill={ROW_BG_COLOR}
        cornerRadius={4}
        stroke={ROW_BORDER_COLOR}
        strokeWidth={1}
      />
      {showLabel && row.name && (
        <Text
          x={8}
          y={4}
          text={row.name}
          fontSize={10}
          fill="#71717a"
          fontStyle="bold"
        />
      )}
      {itemPositions.map(({ item, x, y, width, height }) => (
        <GridItem
          key={item.i}
          item={item}
          x={x}
          y={y}
          width={width}
          height={height}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
          editMode={editMode}
          onDelete={onItemDelete ? () => onItemDelete(item.i) : undefined}
          isSelected={selectedItemId === item.i}
          onSelect={onItemSelect ? () => onItemSelect(item) : undefined}
          cellWidth={cellWidth}
          itemGap={itemGap}
          maxCols={cols}
          onDragEnd={onItemDrag ? (draggedItem, newX) => onItemDrag(draggedItem, newX) : undefined}
        />
      ))}
    </Group>
  );
}
