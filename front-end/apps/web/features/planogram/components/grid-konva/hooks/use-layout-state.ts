import { useState } from 'react';
import type { Layout } from '../utils/types';

export function useLayoutState(
  layout: Layout | undefined,
  dataUpdatedAt: number
): [Layout | null, (layout: Layout) => void] {
  const [state, setState] = useState<{
    layout: Layout | null;
    lastUpdatedAt: number;
  }>({
    layout: layout ?? null,
    lastUpdatedAt: dataUpdatedAt,
  });

  // Reset layout when dataUpdatedAt changes
  if (state.lastUpdatedAt !== dataUpdatedAt) {
    setState({
      layout: layout ?? null,
      lastUpdatedAt: dataUpdatedAt,
    });
  }

  const setLayout = (newLayout: Layout) => {
    setState((prev) => ({
      ...prev,
      layout: newLayout,
    }));
  };

  return [state.layout, setLayout];
}
