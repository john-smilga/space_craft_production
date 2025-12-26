'use client';

import { useEffect } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { RowHeader } from '../row-header/row-header';
import type { LayoutItem } from '@/features/planogram/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { usePlanogramStore, usePlanogramForm, usePlanogramData, useGridActions } from '@/features/planogram';
import { useParams } from 'next/navigation';

const GridLayoutWithProvider = WidthProvider(GridLayout);

export function Grid() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  // Grid slice state
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const editMode = usePlanogramStore.use.editMode();
  const rowNotifications = usePlanogramStore.use.rowNotifications();
  const setEditMode = usePlanogramStore.use.setEditMode();
  const setRowLayouts = usePlanogramStore.use.setRowLayouts();
  const setRowNotification = usePlanogramStore.use.setRowNotification();
  const initializeFromResponse = usePlanogramStore.use.initializeFromResponse();
  
  // Available products slice state
  const availableProductsSidebarOpen = usePlanogramStore.use.availableProductsSidebarOpen();
  const openAvailableProductsForRow = usePlanogramStore.use.openAvailableProductsForRow();
  const toggleAvailableProductsSidebar = usePlanogramStore.use.toggleAvailableProductsSidebar();
  
  const { planogramData, refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
  const { handleSaveLayout: saveLayout } = usePlanogramForm(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);

  // Initialize grid from layout data when planogram loads
  useEffect(() => {
    if (planogramData?.layout && !gridData) {
      initializeFromResponse(planogramData.layout);
    }
  }, [planogramData?.layout, gridData, initializeFromResponse]);

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
      // Update each notification individually
      Object.entries(updated).forEach(([rowIdStr, message]) => {
        setRowNotification(parseInt(rowIdStr), message);
      });
      // Clear notifications that are no longer in the updated object
      Object.keys(rowNotifications).forEach((rowIdStr) => {
        if (!(rowIdStr in updated)) {
          setRowNotification(parseInt(rowIdStr), null);
        }
      });
    } else {
      // Clear all existing notifications
      Object.keys(rowNotifications).forEach((rowIdStr) => {
        setRowNotification(parseInt(rowIdStr), null);
      });
      // Set new notifications
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

  if (!gridData) {
    return null;
  }

  const handleItemDelete = (rowId: number, itemId: string) => {
    if (!gridData) return;

    const row = gridData.rows.find((r) => r.id === rowId);
    if (!row) return;

    const currentLayout = rowLayouts[rowId] && rowLayouts[rowId].length > 0 ? rowLayouts[rowId] : row.items;

    // Remove from grid
    handleSetRowLayouts((prev) => ({
      ...prev,
      [rowId]: currentLayout.filter((item) => item.i !== itemId),
    }));
  };

  const handleSaveLayout = async () => {
    await saveLayout(rowLayouts);
    // Exit edit mode after saving
    setEditMode(false);
  };

  const handleToggleAddItems = () => {
    if (!availableProductsSidebarOpen && gridData?.rows.length > 0) {
      // Open sidebar for first row by default
      openAvailableProductsForRow(gridData.rows[0].id);
    } else {
      toggleAvailableProductsSidebar();
    }
  };

  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-bold'>Shelf Layout</h2>
        <div className='flex items-center gap-2'>
          {!editMode ? (
            <>
              <Button
                onClick={() => {
                  setEditMode(true);
                }}
                size='sm'
                variant='outline'
                className='cursor-pointer'
              >
                Edit Mode
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleToggleAddItems} size='sm' variant='outline' className='cursor-pointer'>
                Add Items
              </Button>
              <Button onClick={handleSaveLayout} size='sm' className='cursor-pointer'>
                Save Layout
              </Button>
            </>
          )}
        </div>
      </div>
      {gridData.rows.map((row) => {
        // Use rowLayouts if available and has items, otherwise fallback to row.items from gridData
        // This ensures we always have proper meta data
        const currentLayout = rowLayouts[row.id] && rowLayouts[row.id].length > 0 ? rowLayouts[row.id] : row.items;
        return (
          <div key={row.id} className='mb-6 relative'>
            {editMode && <RowHeader rowName={row.name || 'Row'} rowId={row.id} />}
            <GridLayoutWithProvider
              className='layout border-2 border-border bg-muted rounded'
              layout={currentLayout}
              onLayoutChange={(newLayout) => {
                if (editMode && currentLayout.length > 0) {
                  handleLayoutChange(row.id, newLayout as LayoutItem[]);
                }
              }}
              cols={gridData.grid.cols}
              rowHeight={100}
              isResizable={false}
              isDraggable={editMode}
              margin={[4, 4]}
            >
              {currentLayout.map((item: LayoutItem) => {
                const bgColor = item.meta.color || '#9ca3af';
                const widthIn = item.meta.pack_width_in;
                return (
                  <div key={item.i} className={`border-2 rounded p-2 flex flex-col items-center justify-center text-sm text-center font-bold text-white drop-shadow-md relative ${editMode ? 'cursor-move' : 'cursor-default'}`} style={{ backgroundColor: bgColor, borderColor: bgColor }}>
                    <div className='flex-1 flex items-center justify-center'>{item.meta.name}</div>
                    {widthIn && <div className='text-[10px] font-normal opacity-90 mt-1'>{widthIn.toFixed(1)}&quot;</div>}
                    {editMode && (
                      <button
                        type='button'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleItemDelete(row.id, item.i);
                        }}
                        className='absolute top-1 right-1 bg-white/90 text-black rounded w-5 h-5 flex items-center justify-center text-xs hover:bg-white shadow-sm cursor-pointer'
                      >
                        <X className='h-4 w-4' />
                      </button>
                    )}
                  </div>
                );
              })}
            </GridLayoutWithProvider>
          </div>
        );
      })}
    </div>
  );
}

