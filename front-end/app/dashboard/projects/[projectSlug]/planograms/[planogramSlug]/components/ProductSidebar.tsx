'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/axios';
import type { Product } from '@/types/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlanogramStore } from '@/features/planogram';

interface PathResponse {
  products: boolean;
  items: Array<{ key: string; name: string } | { id: number; name: string; [key: string]: unknown }>;
}

export default function ProductSidebar() {
  const season = usePlanogramStore.use.season();
  const sidebarExpanded = usePlanogramStore.use.sidebarExpanded();
  const toggleSidebar = usePlanogramStore.use.toggleSidebar();
  const toggleSidebarExpand = usePlanogramStore.use.toggleSidebarExpand();
  const [selectedCategory, setSelectedCategory] = useState<string>('fresh');

  const url = `/categories/path/${selectedCategory}/?season=${season}`;
  const { data, isLoading: loading, error } = useQuery({
    queryKey: ['category-path', selectedCategory, season],
    queryFn: async () => {
      const response = await api.get<PathResponse>(url);
      return response.data;
    },
  });
  const items = data?.items || [];
  const isProducts = data?.products || false;

  const seasonDisplay = season.charAt(0).toUpperCase() + season.slice(1);

  return (
    <div className={`fixed left-0 top-0 h-screen z-40 transition-all duration-300 ${sidebarExpanded ? 'w-xl' : 'w-96'} overflow-hidden bg-card border-r`}>
      <div className='h-full'>
        <Card className='h-full rounded-none border-r border-t-0 border-b-0 border-l-0 flex flex-col'>
          <CardHeader className='shrink-0'>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>All Products</CardTitle>
                <p className='text-sm text-muted-foreground mt-1'>Season: {seasonDisplay}</p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='ghost' size='icon' onClick={toggleSidebarExpand} className='h-8 w-8' title={sidebarExpanded ? 'Collapse' : 'Expand'}>
                  {sidebarExpanded ? <ChevronLeft className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
                </Button>
                <Button variant='ghost' size='icon' onClick={toggleSidebar} className='h-8 w-8'>
                  <X className='h-4 w-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-6 flex-1 overflow-y-auto'>
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='category'>Type</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id='category' className='w-full'>
                    <SelectValue placeholder='Select type' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='fresh'>Fresh</SelectItem>
                    <SelectItem value='frozen'>Frozen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {loading && <div className='text-sm text-muted-foreground'>Loading...</div>}
              {error && <div className='text-sm text-destructive'>Error: {error.message}</div>}
              {!loading && !error && !isProducts && items.length > 0 && (
                <div className='space-y-2'>
                  <Label>Categories</Label>
                  <div className='space-y-2'>
                    {items.map((item: { key?: string; name?: string }) => {
                      if ('key' in item && item.key) {
                        return <CategoryItem key={item.key} path={`${selectedCategory}/${item.key}`} categoryName={item.name || ''} season={season} />;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              {!loading && !error && items.length === 0 && <div className='text-sm text-muted-foreground'>No items found</div>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface CategoryItemProps {
  path: string;
  categoryName: string;
  season: string;
}

function CategoryItem({ path, categoryName, season }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const url = `/categories/path/${path}/?season=${season}`;
  const { data, isLoading: loading } = useQuery({
    queryKey: ['category-path', path, season],
    queryFn: async () => {
      const response = await api.get<PathResponse>(url);
      return response.data;
    },
    enabled: isExpanded,
  });
  const items = data?.items || [];
  const isProducts = data?.products || false;

  const extractedCategoryName =
    path
      .split('/')
      .pop()
      ?.replace(/_/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase()) || '';

  const products: Product[] = useMemo(() => {
    if (!isProducts) return [];
    return items
      .filter((item): item is { id: number; name: string; pack_width_in?: number; pack_height_in?: number; expiration_stability?: number; margin?: number; sales_velocity?: number; seasonality?: number; overall_score?: number } => 'id' in item)
      .map((item) => ({
        id: item.id,
        name: item.name,
        pack_width_in: item.pack_width_in || 0,
        pack_height_in: item.pack_height_in || 0,
        expiration_stability: item.expiration_stability,
        margin: item.margin,
        sales_velocity: item.sales_velocity,
        seasonality: item.seasonality,
        overall_score: item.overall_score,
        category: extractedCategoryName,
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isProducts, extractedCategoryName]);

  // Group products by score ranges
  const groupedProducts = useMemo(() => {
    const groups: Record<string, Product[]> = {
      '90-100%': [],
      '80-89%': [],
      '70-79%': [],
      '60-69%': [],
      'Below 60%': [],
      'No Score': [],
    };

    products.forEach((product) => {
      const score = product.overall_score;
      if (score === undefined || score === null) {
        groups['No Score'].push(product);
      } else {
        const scorePercent = score * 100;
        if (scorePercent >= 90) {
          groups['90-100%'].push(product);
        } else if (scorePercent >= 80) {
          groups['80-89%'].push(product);
        } else if (scorePercent >= 70) {
          groups['70-79%'].push(product);
        } else if (scorePercent >= 60) {
          groups['60-69%'].push(product);
        } else {
          groups['Below 60%'].push(product);
        }
      }
    });

    // Sort each group by score (highest first)
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const scoreA = a.overall_score ?? 0;
        const scoreB = b.overall_score ?? 0;
        return scoreB - scoreA;
      });
    });

    return groups;
  }, [products]);

  return (
    <div className='space-y-1'>
      <label className='flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded'>
        <Checkbox checked={isExpanded} onCheckedChange={() => setIsExpanded(!isExpanded)} />
        <span className='text-sm font-medium'>{categoryName}</span>
      </label>
      {isExpanded && (
        <div className='ml-6 space-y-2'>
          {loading && <div className='text-xs text-muted-foreground pl-2'>Loading...</div>}
          {!loading &&
            !isProducts &&
            items.map((item) => {
              if ('key' in item && typeof item.key === 'string') {
                const categoryItem = item as { key: string; name: string };
                return <CategoryItem key={categoryItem.key} path={`${path}/${categoryItem.key}`} categoryName={categoryItem.name} season={season} />;
              }
              return null;
            })}
          {!loading && isProducts && products.length > 0 && (
            <div className='space-y-4 pl-2'>
              {Object.entries(groupedProducts).map(([scoreRange, groupProducts]) => {
                if (groupProducts.length === 0) return null;
                return (
                  <div key={scoreRange} className='space-y-2'>
                    <div className='text-xs font-semibold text-muted-foreground uppercase tracking-wide'>
                      {scoreRange} ({groupProducts.length})
                    </div>
                    <div className='space-y-2'>
                      {groupProducts.map((product) => (
                        <div key={product.id} className='p-3 rounded border bg-card hover:bg-muted/50 transition-colors cursor-pointer'>
                          <div className='font-medium text-sm mb-1'>{product.name}</div>
                          <div className='flex gap-4 text-xs text-muted-foreground'>
                            <span>Score: {product.overall_score !== undefined ? (product.overall_score * 100).toFixed(0) : 'N/A'}%</span>
                            <span>Margin: {product.margin !== undefined ? (product.margin * 100).toFixed(1) : 'N/A'}%</span>
                            <span>Width: {product.pack_width_in ? `${product.pack_width_in.toFixed(1)}"` : 'N/A'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
