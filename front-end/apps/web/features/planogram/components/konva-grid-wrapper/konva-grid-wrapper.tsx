'use client';

import { useState } from 'react';
import { KonvaGrid } from '@spacecraft/konva-grid';
import { usePlanogramStore, useGridActions } from '@/features/planogram';
import { Button } from '@/components/ui/button';
import { Edit, Plus, Save, AlertCircle } from 'lucide-react';
import type { LayoutItem } from '@/features/planogram/types';

export function KonvaGridWrapper() {
  const [selectedItem, setSelectedItem] = useState<{rowId: number, itemId: string} | null>(null);

  // Grid slice state
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const editMode = usePlanogramStore.use.editMode();
  const rowNotifications = usePlanogramStore.use.rowNotifications();
  const setEditMode = usePlanogramStore.use.setEditMode();
  const setRowLayouts = usePlanogramStore.use.setRowLayouts();
  const setRowNotification = usePlanogramStore.use.setRowNotification();

  // Available products slice state
  const toggleAvailableProductsSidebar = usePlanogramStore.use.toggleAvailableProductsSidebar();

  if (!gridData) {
    return null;
  }

  // Wrapper for setRowLayouts to match React Dispatch signature
  const handleSetRowLayouts = (value: React.SetStateAction<Record<number, LayoutItem[]>>) => {
    if (typeof value === 'function') {
      setRowLayouts(value(rowLayouts));
    } else {
      setRowLayouts(value);
    }
  };

  // Wrapper for setRowNotifications to match React Dispatch signature
  const handleSetRowNotifications = (value: React.SetStateAction<Record<number, string>>) => {
    if (typeof value === 'function') {
      const updated = value(rowNotifications);
      Object.entries(updated).forEach(([rowIdStr, message]) => {
        setRowNotification(parseInt(rowIdStr), message);
      });
      Object.keys(rowNotifications).forEach((rowIdStr) => {
        if (!(rowIdStr in updated)) {
          setRowNotification(parseInt(rowIdStr), null);
        }
      });
    } else {
      Object.keys(rowNotifications).forEach((rowIdStr) => {
        setRowNotification(parseInt(rowIdStr), null);
      });
      Object.entries(value).forEach(([rowIdStr, message]) => {
        setRowNotification(parseInt(rowIdStr), message);
      });
    }
  };

  const { handleLayoutChange } = useGridActions({
    gridData,
    rowLayouts,
    setRowLayouts: handleSetRowLayouts,
    setSelectedItem: () => {},
    setRowNotifications: handleSetRowNotifications,
    selectedItem: null,
  });

  const handleItemDelete = (rowId: number, itemId: string) => {
    if (!gridData) return;

    const row = gridData.rows.find((r) => r.id === rowId);
    if (!row) return;

    const currentLayout = rowLayouts[rowId] && rowLayouts[rowId].length > 0 ? rowLayouts[rowId] : row.items;

    setRowLayouts({
      ...rowLayouts,
      [rowId]: currentLayout.filter((item) => item.i !== itemId),
    });

    if (selectedItem?.rowId === rowId && selectedItem?.itemId === itemId) {
      setSelectedItem(null);
    }
  };

  const handleItemSelect = (item: LayoutItem, rowId: number) => {
    if (editMode) {
      setSelectedItem({ rowId, itemId: item.i });
    }
  };

  const handleSaveLayout = () => {
    setEditMode(false);
    setSelectedItem(null);
  };

  return (
    <div className="bg-card p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Shelf Layout (Konva)</h2>
        <div className="flex gap-2">
          {!editMode ? (
            <Button
              onClick={() => setEditMode(true)}
              variant="outline"
              size="sm"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Mode
            </Button>
          ) : (
            <>
              <Button
                onClick={toggleAvailableProductsSidebar}
                variant="outline"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Items
              </Button>
              <Button
                onClick={handleSaveLayout}
                variant="default"
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Layout
              </Button>
            </>
          )}
        </div>
      </div>
      {Object.keys(rowNotifications).length > 0 && (
        <div className="mb-4 space-y-2">
          {Object.entries(rowNotifications).map(([rowIdStr, message]) => {
            const rowId = parseInt(rowIdStr);
            const row = gridData.rows.find((r) => r.id === rowId);
            return (
              <div
                key={rowId}
                className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-md text-amber-800"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">
                  <strong>Row {row?.name ?? rowId}:</strong> {message}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <div className="border-2 border-border bg-muted rounded">
        <KonvaGrid
          gridData={gridData}
          rowLayouts={rowLayouts}
          rowHeight={108}
          itemGap={4}
          showRowLabels={false}
          editMode={editMode}
          onLayoutChange={handleLayoutChange}
          onItemDelete={handleItemDelete}
          selectedItemId={selectedItem?.itemId ?? null}
          onItemSelect={handleItemSelect}
        />
      </div>
    </div>
  );
}
