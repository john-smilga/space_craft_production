import type { z } from 'zod';
import type { schemas } from '@/lib/generated/api-schemas';

export type Layout = z.infer<typeof schemas.Layout>;
export type LayoutItem = z.infer<typeof schemas.LayoutItem>;

export type FlattenedItem = LayoutItem & {
  rowId: number;
  rowIndex: number;
  pixelX: number;
  pixelY: number;
};

export type SaveStatus = 'idle' | 'saving' | 'deleting' | 'saved' | 'error';

export const ROW_HEIGHT = 100;
export const MARGIN = 4;
