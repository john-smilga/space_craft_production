'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { usePlanogramStore } from '@/features/planogram/store/usePlanogramStore';
import { usePlanogramQuery } from '@/features/planogram/queries/use-planogram-query';
import { useLayoutQuery } from '@/features/planogram/queries/use-layout-query';
import { useAvailableProductsQuery } from '@/features/planogram/queries/use-available-products-query';
import { useAddProductsMutation } from '@/features/planogram/queries/use-add-products-mutation';

export function AddProductsSidebar() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  // Get planogram data for categories and season
  const { data: planogram } = usePlanogramQuery(planogramSlug);

  // Get layout for available rows
  const { data: layout } = useLayoutQuery(planogramSlug);

  // Fetch available products based on planogram categories/season
  const categoryIds = (planogram?.category_ids ?? []) as number[];
  const season = planogram?.season ?? 'summer';

  const { data: availableProducts = [], isLoading: loadingProducts } = useAvailableProductsQuery({
    categoryIds,
    season,
  });

  // Store state
  const selectedProducts = usePlanogramStore((state) => state.selectedProducts);
  const incrementProduct = usePlanogramStore((state) => state.incrementProduct);
  const decrementProduct = usePlanogramStore((state) => state.decrementProduct);
  const closeAddProducts = usePlanogramStore((state) => state.closeAddProducts);
  const targetRowId = usePlanogramStore((state) => state.targetRowId);
  const setTargetRowId = usePlanogramStore((state) => state.setTargetRowId);
  const addProductsSidebarExpanded = usePlanogramStore((state) => state.addProductsSidebarExpanded);
  const toggleAddProductsSidebarExpand = usePlanogramStore((state) => state.toggleAddProductsSidebarExpand);
  const clearSelectedProducts = usePlanogramStore((state) => state.clearSelectedProducts);

  // Mutation
  const addProductsMutation = useAddProductsMutation();

  const formatScore = (score: number) => {
    return (score * 100).toFixed(0);
  };

  const formatMargin = (margin: number) => {
    return (margin * 100).toFixed(1);
  };

  // Get available rows from layout
  const availableRows =
    layout?.rows.map((row) => ({
      id: row.id - 1, // Convert to 0-based index
      name: row.name || `Shelf ${row.id}`,
    })) || [];

  // Calculate total selected count
  const totalSelected = Array.from(selectedProducts.values()).reduce((sum, qty) => sum + qty, 0);

  const handleAddItems = () => {
    if (totalSelected === 0 || targetRowId === null) return;

    // Convert Map to array of {id, quantity}
    const products = Array.from(selectedProducts.entries()).map(([id, quantity]) => ({
      id,
      quantity,
    }));

    addProductsMutation.mutate(
      {
        slug: planogramSlug,
        data: {
          row_id: targetRowId,
          products,
        },
      },
      {
        onSuccess: () => {
          clearSelectedProducts();
          closeAddProducts();
        },
      }
    );
  };

  return (
    <Card
      className={`h-screen fixed right-0 top-0 z-50 rounded-none border-l border-t-0 border-b-0 border-r-0 flex flex-col ${addProductsSidebarExpanded ? 'w-3xl' : 'w-[32rem]'} transition-all duration-300`}
    >
      <CardHeader className="shrink-0 border-b">
        <div className="flex items-center justify-between">
          <CardTitle>Add Products</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleAddProductsSidebarExpand}
              className="h-8 w-8"
              title={addProductsSidebarExpanded ? 'Collapse' : 'Expand'}
            >
              {addProductsSidebarExpanded ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={closeAddProducts} className="h-8 w-8" title="Close">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {totalSelected} item{totalSelected !== 1 ? 's' : ''} selected
        </p>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto p-0">
        {loadingProducts ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : availableProducts.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No products available</div>
        ) : (
          <div className="divide-y">
            {availableProducts.map((product) => {
              const quantity = selectedProducts.get(product.id) || 0;
              return (
                <div key={product.id} className="p-4 hover:bg-accent transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-1">{product.name}</div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Score: {formatScore(product.overall_score || 0)}%</span>
                        <span>Margin: {formatMargin(product.margin || 0)}%</span>
                        <span>Width: {product.pack_width_in ? `${product.pack_width_in.toFixed(1)}"` : 'N/A'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => decrementProduct(product.id)}
                        disabled={quantity === 0}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                      <Button size="icon" variant="outline" className="h-7 w-7" onClick={() => incrementProduct(product.id)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
      <div className="shrink-0 border-t p-4 space-y-3">
        {availableRows.length > 0 && (
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Add to Shelf</Label>
            <Select value={targetRowId?.toString() || ''} onValueChange={(value) => setTargetRowId(parseInt(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select shelf" />
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
        <Button
          onClick={handleAddItems}
          disabled={totalSelected === 0 || targetRowId === null || addProductsMutation.isPending}
          className="w-full"
        >
          {addProductsMutation.isPending ? 'Adding...' : `Add Items (${totalSelected})`}
        </Button>
      </div>
    </Card>
  );
}
