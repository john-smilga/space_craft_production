'use client';
import { Dispatch, SetStateAction } from 'react';
import type { GridResponse, LayoutItem, AvailableItem } from '../types';

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

type UseGridActionsParams = {
  gridData: GridResponse | null;
  rowLayouts: Record<number, LayoutItem[]>;
  setRowLayouts: Dispatch<SetStateAction<Record<number, LayoutItem[]>>>;
  setSelectedItem: Dispatch<SetStateAction<{ rowId: number; itemId: string; x: number; y: number } | null>>;
  setRowNotifications: Dispatch<SetStateAction<Record<number, string>>>;
  selectedItem: { rowId: number; itemId: string; x: number; y: number } | null;
}

export function useGridActions({ gridData, rowLayouts, setRowLayouts, setSelectedItem, setRowNotifications, selectedItem }: UseGridActionsParams) {
  const handleLayoutChange = (rowId: number, newLayout: LayoutItem[]) => {
    setRowLayouts((prev) => {
      // Get current layout from state, or fallback to gridData, or empty array
      const currentLayout = prev[rowId] || gridData?.rows.find((r) => r.id === rowId)?.items || [];

      // If currentLayout is empty, don't process (wait for proper initialization)
      if (currentLayout.length === 0) {
        return prev;
      }

      // Create a map of existing items by their id for faster lookup
      const existingItemsMap = new Map(currentLayout.map((item) => [item.i, item]));

      // Also create a map from gridData as ultimate fallback
      const gridDataRow = gridData?.rows.find((r) => r.id === rowId);
      const gridDataItemsMap = gridDataRow ? new Map(gridDataRow.items.map((item) => [item.i, item])) : new Map();

      // Merge new layout positions with existing meta data
      const updatedLayout = newLayout.map((newItem) => {
        // First try to find in current layout state
        const existingItem = existingItemsMap.get(newItem.i);
        if (existingItem && existingItem.meta && existingItem.meta.name) {
          // Preserve all existing meta data, only update position/size
          return {
            ...newItem,
            meta: existingItem.meta,
          };
        }

        // If not found in state, try to get from gridData as fallback
        const gridDataItem = gridDataItemsMap.get(newItem.i);
        if (gridDataItem && gridDataItem.meta && gridDataItem.meta.name) {
          return {
            ...newItem,
            meta: gridDataItem.meta,
          };
        }

        // If we still can't find it, skip updating this item (don't create Unknown)
        // This prevents corruption of the layout
        return existingItem || gridDataItem || newItem;
      });

      return {
        ...prev,
        [rowId]: updatedLayout,
      };
    });
  };

  const handleItemClick = (rowId: number, itemId: string, x: number, y: number, editMode: boolean) => {
    if (editMode) {
      setSelectedItem({ rowId, itemId, x, y });
    }
  };

  const handleRemoveItem = (itemId: string) => {
    if (!gridData || !selectedItem) {
      return;
    }

    const row = gridData.rows.find((r) => r.id === selectedItem.rowId);
    if (!row) {
      return;
    }

    const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
    const itemToRemove = currentLayout.find((item) => item.i === itemId);
    if (!itemToRemove) {
      return;
    }

    // Remove from grid
    setRowLayouts((prev) => ({
      ...prev,
      [selectedItem.rowId]: currentLayout.filter((item) => item.i !== itemId),
    }));

    setSelectedItem(null);
  };

  const handleReplaceItem = (oldItemId: string, newItem: AvailableItem) => {
    if (!gridData || !selectedItem) {
      return;
    }

    const row = gridData.rows.find((r) => r.id === selectedItem.rowId);
    if (!row) {
      return;
    }

    const currentLayout = rowLayouts[selectedItem.rowId] || row.items;
    const oldItem = currentLayout.find((item) => item.i === oldItemId);
    if (!oldItem) {
      return;
    }

    // Calculate new width
    const newWidth = widthCellsFor(newItem.pack_width_in, gridData.grid.cellWidthIn);

    // Replace item
    setRowLayouts((prev) => ({
      ...prev,
      [selectedItem.rowId]: currentLayout.map((item) =>
        item.i === oldItemId
          ? {
              ...item,
              i: String(newItem.id),
              w: newWidth,
              meta: {
                id: newItem.id,
                name: newItem.name,
                category: newItem.category || '',
                color: newItem.color || '#9ca3af',
                score: newItem.score,
                pack_width_in: newItem.pack_width_in,
                pack_height_in: newItem.pack_height_in,
              },
            }
          : item
      ),
    }));

    setSelectedItem(null);
  };

  const handleAddItem = (rowId: number, item: AvailableItem) => {
    if (!gridData) {
      return;
    }

    const currentLayout = rowLayouts[rowId] || gridData.rows.find((r) => r.id === rowId)?.items || [];

    // Calculate item width in cells
    const itemWidth = widthCellsFor(item.pack_width_in, gridData.grid.cellWidthIn);
    const maxCols = gridData.grid.cols;

    // Check if item fits at all
    if (itemWidth > maxCols) {
      setRowNotifications((prev) => ({
        ...prev,
        [rowId]: `"${item.name}" is too wide to fit on the shelf.`,
      }));
      // Clear notification after 3 seconds
      setTimeout(() => {
        setRowNotifications((prev) => {
          const updated = { ...prev };
          delete updated[rowId];
          return updated;
        });
      }, 3000);
      return;
    }

    // Find the rightmost position of existing items
    const rightmostX = currentLayout.length > 0 ? Math.max(...currentLayout.map((item) => item.x + item.w)) : 0;

    // Generate unique ID for this item instance
    const existingCount = currentLayout.filter((layoutItem) => layoutItem.meta.id === item.id).length;
    const uniqueId = existingCount > 0 ? `${item.id}-${existingCount}` : String(item.id);

    const newItem: LayoutItem = {
      i: uniqueId,
      x: rightmostX,
      y: rowId - 1,
      w: itemWidth,
      h: 1,
      meta: {
        id: item.id,
        name: item.name,
        category: item.category || '',
        color: item.color || '#9ca3af',
        score: item.score,
        pack_width_in: item.pack_width_in,
        pack_height_in: item.pack_height_in,
      },
    };

    // Check if item fits at the end
    if (rightmostX + itemWidth <= maxCols) {
      // Item fits
      setRowLayouts((prev) => ({
        ...prev,
        [rowId]: [...currentLayout, newItem],
      }));

      // Clear any existing notification for this row
      setRowNotifications((prev) => {
        const updated = { ...prev };
        delete updated[rowId];
        return updated;
      });
    } else {
      // Item doesn't fit - show inline notification but still add it
      setRowNotifications((prev) => ({
        ...prev,
        [rowId]: `"${item.name}" may overflow`,
      }));

      // Clear notification after 3 seconds
      setTimeout(() => {
        setRowNotifications((prev) => {
          const updated = { ...prev };
          delete updated[rowId];
          return updated;
        });
      }, 3000);

      // Still add it - RGL will create a new row if needed
      setRowLayouts((prev) => ({
        ...prev,
        [rowId]: [...currentLayout, newItem],
      }));
    }
  };

  return {
    handleLayoutChange,
    handleItemClick,
    handleRemoveItem,
    handleReplaceItem,
    handleAddItem,
  };
}

