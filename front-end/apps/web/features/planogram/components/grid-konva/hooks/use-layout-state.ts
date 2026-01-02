import { useState, useEffect } from 'react';
import type { Layout } from '../utils/types';

export function useLayoutState(
  layout: Layout | undefined,
  dataUpdatedAt: number
): [Layout | null, (layout: Layout) => void] {
  const [localLayout, setLocalLayout] = useState<Layout | null>(null);

  useEffect(() => {
    if (layout) {
      setLocalLayout(layout);
    }
  }, [layout, dataUpdatedAt]);

  return [localLayout, setLocalLayout];
}
