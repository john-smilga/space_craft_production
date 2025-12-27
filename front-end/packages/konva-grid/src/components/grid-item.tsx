import { useState } from 'react';
import { Group, Rect, Text, Circle, Line } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { LayoutItem } from '../types';

const DEFAULT_ITEM_COLOR = '#9ca3af';
const TEXT_COLOR = '#ffffff';
const TEXT_SHADOW_COLOR = 'rgba(0, 0, 0, 0.5)';

type GridItemProps = {
  item: LayoutItem;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick?: () => void;
  editMode?: boolean;
  onDelete?: () => void;
  isSelected?: boolean;
  onSelect?: () => void;
  cellWidth?: number;
  itemGap?: number;
  maxCols?: number;
  onDragEnd?: (item: LayoutItem, newX: number) => void;
}

export function GridItem({
  item,
  x,
  y,
  width,
  height,
  onClick,
  editMode,
  onDelete,
  isSelected,
  onSelect,
  cellWidth,
  itemGap,
  maxCols,
  onDragEnd,
}: GridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const bgColor = item.meta.color ?? DEFAULT_ITEM_COLOR;
  const productName = item.meta.name;
  const widthIn = item.meta.pack_width_in;

  const nameFontSize = Math.min(12, Math.max(8, width / 8));
  const widthFontSize = Math.min(10, Math.max(7, width / 10));
  const padding = 4;
  const textAreaWidth = width - padding * 2;

  const handleMouseEnter = (e: KonvaEventObject<MouseEvent>) => {
    if (editMode) {
      setIsHovered(true);
      const container = e.target.getStage()?.container();
      if (container) {
        container.style.cursor = 'move';
      }
    }
  };

  const handleMouseLeave = (e: KonvaEventObject<MouseEvent>) => {
    if (editMode) {
      setIsHovered(false);
      const container = e.target.getStage()?.container();
      if (container) {
        container.style.cursor = 'default';
      }
    }
  };

  const handleClick = () => {
    if (editMode && onSelect) {
      onSelect();
    } else if (onClick) {
      onClick();
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setIsDragging(false);

    if (!onDragEnd || !cellWidth || !itemGap || maxCols === undefined) {
      return;
    }

    const node = e.target;
    const newPixelX = node.x();

    const gridX = Math.round((newPixelX - itemGap) / cellWidth);
    const clampedX = Math.max(0, Math.min(gridX, maxCols - item.w));

    node.position({ x, y });

    onDragEnd(item, clampedX);
  };

  const dragBoundFunc = (pos: { x: number; y: number }) => {
    if (!cellWidth || !itemGap || maxCols === undefined) {
      return pos;
    }

    const gridX = Math.round((pos.x - itemGap) / cellWidth);
    const clampedX = Math.max(0, Math.min(gridX, maxCols - item.w));
    const snappedX = clampedX * cellWidth + itemGap;

    return {
      x: snappedX,
      y,
    };
  };

  return (
    <Group
      x={x}
      y={y}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      draggable={editMode ?? false}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      dragBoundFunc={editMode ? dragBoundFunc : undefined}
    >
      <Rect
        width={width}
        height={height}
        fill={bgColor}
        cornerRadius={4}
        stroke={bgColor}
        strokeWidth={2}
        shadowColor="rgba(0, 0, 0, 0.1)"
        shadowBlur={2}
        shadowOffsetY={1}
        opacity={editMode && isHovered ? 0.9 : 1}
      />
      {isSelected && (
        <Rect
          width={width}
          height={height}
          fill="transparent"
          stroke="#3b82f6"
          strokeWidth={3}
          cornerRadius={4}
        />
      )}
      <Text
        x={padding}
        y={height / 2 - nameFontSize / 2 - (widthIn ? 6 : 0)}
        width={textAreaWidth}
        text={productName}
        fontSize={nameFontSize}
        fill={TEXT_COLOR}
        align="center"
        verticalAlign="middle"
        fontStyle="bold"
        shadowColor={TEXT_SHADOW_COLOR}
        shadowBlur={1}
        shadowOffsetX={1}
        shadowOffsetY={1}
        ellipsis={true}
        wrap="word"
      />
      {widthIn && (
        <Text
          x={padding}
          y={height - widthFontSize - padding - 4}
          width={textAreaWidth}
          text={`${widthIn.toFixed(1)}"`}
          fontSize={widthFontSize}
          fill={TEXT_COLOR}
          align="center"
          opacity={0.9}
          shadowColor={TEXT_SHADOW_COLOR}
          shadowBlur={1}
        />
      )}
      {editMode && onDelete && (
        <Group
          x={width - 20}
          y={4}
          onMouseEnter={() => setIsDeleteHovered(true)}
          onMouseLeave={() => setIsDeleteHovered(false)}
          onClick={(e: KonvaEventObject<MouseEvent>) => {
            e.cancelBubble = true;
            onDelete();
          }}
        >
          <Circle
            radius={8}
            fill="#ffffff"
            opacity={isDeleteHovered ? 1 : 0.9}
            stroke="#ef4444"
            strokeWidth={1}
          />
          <Line
            points={[-4, -4, 4, 4]}
            stroke="#ef4444"
            strokeWidth={2}
            lineCap="round"
          />
          <Line
            points={[4, -4, -4, 4]}
            stroke="#ef4444"
            strokeWidth={2}
            lineCap="round"
          />
        </Group>
      )}
    </Group>
  );
}
