import { Group, Rect, Text, Circle } from 'react-konva';
import type { FlattenedItem } from '../utils/types';
import { ROW_HEIGHT, MARGIN } from '../utils/types';

type GridItemProps = {
  item: FlattenedItem;
  cellWidth: number;
  onDragEnd: (item: FlattenedItem, newX: number, newY: number) => void;
  onRemove: (item: FlattenedItem) => void;
};

export function GridItem({ item, cellWidth, onDragEnd, onRemove }: GridItemProps) {
  const width = item.w * cellWidth - MARGIN * 2;
  const height = ROW_HEIGHT - MARGIN * 2;
  const bgColor = item.meta.color || '#9ca3af';

  return (
    <Group
      x={item.pixelX}
      y={item.pixelY}
      draggable
      onDragEnd={(e) => {
        onDragEnd(item, e.target.x(), e.target.y());
      }}
    >
      <Rect
        width={width}
        height={height}
        fill={bgColor}
        stroke={bgColor}
        strokeWidth={2}
        cornerRadius={4}
        shadowBlur={4}
        shadowOpacity={0.3}
      />

      <Text
        width={width}
        height={height}
        text={item.meta.name}
        fontSize={14}
        fontStyle='bold'
        fill='#ffffff'
        align='center'
        verticalAlign='middle'
      />

      {item.meta.pack_width_in && (
        <Text
          y={height - 20}
          width={width}
          text={`${item.meta.pack_width_in.toFixed(1)}"`}
          fontSize={10}
          fill='#ffffff'
          opacity={0.9}
          align='center'
        />
      )}

      <Group
        x={width - 24}
        y={4}
        onClick={(e) => {
          e.cancelBubble = true;
          onRemove(item);
        }}
        onTap={(e) => {
          e.cancelBubble = true;
          onRemove(item);
        }}
      >
        <Circle radius={10} fill='#000000' opacity={0.5} />
        <Text
          x={-5}
          y={-7}
          text='×'
          fontSize={16}
          fill='#ffffff'
        />
      </Group>
    </Group>
  );
}
