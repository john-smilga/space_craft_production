'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { usePlanogramAvailableProductsStore } from '@/stores/planogramAvailableProductsStore';
import { usePlanogramSidebarStore } from '@/stores/planogramSidebarStore';
import { usePlanogramLayoutStore } from '@/stores/planogramLayoutStore';
import { usePlanogramLayout } from '../hooks/usePlanogramLayout';

export default function AvailableProductsSidebar() {
  const { availableItems, loadingAvailableItems, selectedAvailableItems, incrementItemQuantity, decrementItemQuantity, closeAvailableProductsSidebar, targetRowId, setTargetRowId } = usePlanogramAvailableProductsStore();
  const { availableProductsSidebarExpanded, toggleAvailableProductsSidebarExpand } = usePlanogramSidebarStore();
  const { gridData } = usePlanogramLayoutStore();
  const { handleAddSelectedItems } = usePlanogramLayout();

  const formatScore = (score: number) => {
    return (score * 100).toFixed(0);
  };

  const formatMargin = (margin: number) => {
    return (margin * 100).toFixed(1);
  };

  // Get available rows from gridData
  const availableRows =
    gridData?.rows.map((row) => ({
      id: row.id,
      name: row.name || `Shelf ${row.id}`,
    })) || [];

  // Calculate total selected count
  const totalSelected = Array.from(selectedAvailableItems.values()).reduce((sum, qty) => sum + qty, 0);

  return (
    <Card className={`h-screen fixed right-0 top-0 z-50 rounded-none border-l border-t-0 border-b-0 border-r-0 flex flex-col ${availableProductsSidebarExpanded ? 'w-3xl' : 'w-[32rem]'} transition-all duration-300`}>
      <CardHeader className='shrink-0 border-b'>
        <div className='flex items-center justify-between'>
          <CardTitle>Available Products</CardTitle>
          <div className='flex items-center gap-2'>
            <Button variant='ghost' size='icon' onClick={toggleAvailableProductsSidebarExpand} className='h-8 w-8 cursor-pointer' title={availableProductsSidebarExpanded ? 'Collapse' : 'Expand'}>
              {availableProductsSidebarExpanded ? <ChevronRight className='h-4 w-4' /> : <ChevronLeft className='h-4 w-4' />}
            </Button>
            <Button variant='ghost' size='icon' onClick={closeAvailableProductsSidebar} className='h-8 w-8 cursor-pointer' title='Close'>
              <X className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <p className='text-sm text-muted-foreground mt-1'>
          {totalSelected} item{totalSelected !== 1 ? 's' : ''} selected
        </p>
      </CardHeader>
      <CardContent className='flex-1 overflow-y-auto p-0'>
        {loadingAvailableItems ? (
          <div className='flex items-center justify-center py-12'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600'></div>
          </div>
        ) : availableItems.length === 0 ? (
          <div className='p-4 text-center text-muted-foreground'>No products available</div>
        ) : (
          <div className='divide-y'>
            {availableItems.map((item) => {
              const quantity = selectedAvailableItems.get(item.id) || 0;
              return (
                <div key={item.id} className='p-4 hover:bg-accent transition-colors'>
                  <div className='flex items-start gap-3'>
                    <div className='flex-1 min-w-0'>
                      <div className='font-semibold text-sm mb-1'>{item.name}</div>
                      <div className='flex items-center gap-4 text-xs text-muted-foreground'>
                        <span>Score: {formatScore(item.score)}%</span>
                        <span>Margin: {formatMargin(item.margin)}%</span>
                        <span>Width: {item.pack_width_in ? `${item.pack_width_in.toFixed(1)}"` : 'N/A'}</span>
                      </div>
                    </div>
                    <div className='flex items-center gap-2 shrink-0'>
                      <Button size='icon' variant='outline' className='h-7 w-7' onClick={() => decrementItemQuantity(item.id)} disabled={quantity === 0}>
                        <Minus className='h-3 w-3' />
                      </Button>
                      <span className='w-8 text-center text-sm font-medium'>{quantity}</span>
                      <Button size='icon' variant='outline' className='h-7 w-7' onClick={() => incrementItemQuantity(item.id)}>
                        <Plus className='h-3 w-3' />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <div className='shrink-0 border-t p-4 space-y-3'>
        {/* Shelf Selector */}
        {availableRows.length > 0 && (
          <div>
            <Label className='text-xs text-muted-foreground mb-1 block'>Add to Shelf</Label>
            <Select value={targetRowId?.toString() || ''} onValueChange={(value) => setTargetRowId(parseInt(value))}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select shelf' />
              </SelectTrigger>
              <SelectContent>
                {availableRows.map((row) => (
                  <SelectItem key={row.id} value={row.id.toString()}>
                    {row.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <Button onClick={handleAddSelectedItems} disabled={totalSelected === 0 || loadingAvailableItems} className='w-full cursor-pointer'>
          Add Items ({totalSelected})
        </Button>
      </div>
    </Card>
  );
}
