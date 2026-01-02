import { useState, useEffect, type RefObject } from 'react';

export function useContainerResize(
  containerRef: RefObject<HTMLDivElement | null>,
  enabled: boolean = true
): number {
  const [stageWidth, setStageWidth] = useState(0);

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return;
    }

    const element = containerRef.current;

    const updateWidth = () => {
      const width = element.offsetWidth;
      setStageWidth(width);
    };

    const timeoutId = requestAnimationFrame(() => {
      updateWidth();
    });

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setStageWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(element);

    return () => {
      cancelAnimationFrame(timeoutId);
      resizeObserver.disconnect();
    };
  }, [containerRef, enabled]);

  return stageWidth;
}
