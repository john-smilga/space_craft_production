import type { LayoutItem } from '../types';
import { usePlanogramStore } from '../store';

// Helper function to calculate width in cells (matches backend logic)
// Option 2: Items 0-6" = 1 cell, 6-12" = 1 cell, 12+ = floor-based
function widthCellsFor(widthIn: number, cellWidthIn: number): number {
  if (widthIn <= 0) {
    return 0;
  }
  if (widthIn < 12) {
    return 1;
  }
  // For 12+ inches, use floor division (12" = 2 cells, 18" = 3 cells, etc.)
  return Math.max(2, Math.floor(widthIn / cellWidthIn));
}

export function usePlanogramLayout() {
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const setRowLayouts = usePlanogramStore.use.setRowLayouts();
  const availableItems = usePlanogramStore.use.availableItems();
  const selectedAvailableItems = usePlanogramStore.use.selectedAvailableItems();
  const targetRowId = usePlanogramStore.use.targetRowId();
  const clearSelectedAvailableItems = usePlanogramStore.use.clearSelectedAvailableItems();
  const closeAvailableProductsSidebar = usePlanogramStore.use.closeAvailableProductsSidebar();

  // Handle adding selected items to a row
  const handleAddSelectedItems = () => {
    if (!gridData || targetRowId === null || selectedAvailableItems.size === 0) {
      return;
    }

    const maxCols = gridData.grid.cols;
    const newItems: LayoutItem[] = [];

    // Loop through each selected item and its quantity
    selectedAvailableItems.forEach((quantity, itemId) => {
      const item = availableItems.find((i) => i.id === itemId);
      if (!item) {
        return;
      }

      // Add the item 'quantity' number of times
      for (let i = 0; i < quantity; i++) {
        const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);

        // Always try to place in the target row first
        let placed = false;
        let finalX = 0;
        let finalRowId = targetRowId;

        // Get the target row
        const targetRow = gridData.rows.find((r) => r.id === targetRowId);
        if (targetRow) {
          const rowLayout = rowLayouts[targetRowId] && rowLayouts[targetRowId].length > 0 ? rowLayouts[targetRowId] : targetRow.items;

          // Combine existing items with items we're adding in this batch (for collision detection)
          const itemsInThisRow = newItems.filter((item) => item.y + 1 === targetRowId);
          const allItemsInRow = [...rowLayout, ...itemsInThisRow];

          // Try to find a position from left to right, starting from x=0
          let testX = 0;
          while (testX + itemWidth <= maxCols) {
            // Check for collisions with existing items and items we're adding
            const hasCollision = allItemsInRow.some((existingItem) => {
              const existingRight = existingItem.x + existingItem.w;
              const itemRight = testX + itemWidth;
              return (testX >= existingItem.x && testX < existingRight) || (itemRight > existingItem.x && itemRight <= existingRight) || (testX < existingItem.x && itemRight > existingRight);
            });

            if (!hasCollision) {
              // Found a good position!
              finalX = testX;
              finalRowId = targetRowId;
              placed = true;
              break;
            }

            testX++;
          }

          // If no perfect position found in target row, place at the rightmost position (allow overflow)
          if (!placed) {
            const rightmostX = allItemsInRow.length > 0 ? Math.max(...allItemsInRow.map((item) => item.x + item.w)) : 0;
            finalX = rightmostX;
            finalRowId = targetRowId;
            placed = true;
          }
        }

        // Add the item
        const finalRow = gridData.rows.find((r) => r.id === finalRowId);
        if (finalRow) {
          // Use timestamp-based unique ID to avoid duplicates
          const timestamp = Date.now();
          const randomSuffix = Math.random().toString(36).substring(2, 9);
          const uniqueId = `${item.id}-${timestamp}-${randomSuffix}`;

          newItems.push({
            i: uniqueId,
            x: finalX,
            y: finalRowId - 1,
            w: itemWidth,
            h: 1,
            meta: {
              id: item.id,
              name: item.name,
              category: item.category,
              color: item.color || '#9ca3af',
              score: item.score,
              pack_width_in: item.pack_width_in,
              pack_height_in: item.pack_height_in,
            },
          });
        }
      }
    });

    // Group new items by row and update rowLayouts
    const itemsByRow: Record<number, LayoutItem[]> = {};
    newItems.forEach((item) => {
      const rowId = item.y + 1; // Convert y back to rowId
      if (!itemsByRow[rowId]) {
        itemsByRow[rowId] = [];
      }
      itemsByRow[rowId].push(item);
    });

    // Update each affected row
    if (Object.keys(itemsByRow).length > 0) {
      const updated = { ...rowLayouts };
      Object.entries(itemsByRow).forEach(([rowIdStr, items]) => {
        const rowId = parseInt(rowIdStr);
        const row = gridData.rows.find((r) => r.id === rowId);
        const existingRowLayout = updated[rowId] || row?.items || [];
        updated[rowId] = [...existingRowLayout, ...items];
      });
      setRowLayouts(updated);

      // Clear selections and close sidebar
      clearSelectedAvailableItems();
      closeAvailableProductsSidebar();
    }
  };

  return {
    handleAddSelectedItems,
  };
}

