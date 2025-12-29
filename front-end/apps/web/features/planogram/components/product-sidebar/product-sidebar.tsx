'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { usePlanogramQuery } from '@/features/planogram/queries/use-planogram-query';
import { useCategoryPathQuery } from '@/features/planogram/queries/use-category-path-query';
import { usePlanogramStore } from '@/features/planogram/store/usePlanogramStore';
import { CategoryItem } from './category-item';

export function ProductSidebar() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const { data: planogramData } = usePlanogramQuery(planogramSlug);
  const season = planogramData?.season || 'summer';

  const sidebarOpen = usePlanogramStore((state) => state.sidebarOpen);
  const toggleSidebar = usePlanogramStore((state) => state.toggleSidebar);

  const [selectedCategory, setSelectedCategory] = useState<string>('fresh');

  const { data, isLoading, error } = useCategoryPathQuery({
    categoryPath: selectedCategory,
    season,
  });

  const items = data?.items || [];
  const isProducts = data?.products || false;

  const seasonDisplay = season.charAt(0).toUpperCase() + season.slice(1);

  if (!sidebarOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-screen w-96 z-40 bg-card border-r">
      <Card className="h-full rounded-none border-r border-t-0 border-b-0 border-l-0 flex flex-col">
        <CardHeader className="shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Products</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Season: {seasonDisplay}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Type</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresh">Fresh</SelectItem>
                  <SelectItem value="frozen">Frozen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {isLoading && (
              <div className="text-sm text-muted-foreground">Loading...</div>
            )}
            {error && (
              <div className="text-sm text-destructive">
                Error: {error.message}
              </div>
            )}

            {!isLoading && !error && !isProducts && items.length > 0 && (
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="space-y-2">
                  {items
                    .filter((item): item is { key: string; name: string } =>
                      'key' in item && typeof item.key === 'string'
                    )
                    .map((item) => (
                      <CategoryItem
                        key={item.key}
                        path={`${selectedCategory}/${item.key}`}
                        categoryName={item.name || ''}
                        season={season}
                      />
                    ))}
                </div>
              </div>
            )}

            {!isLoading && !error && items.length === 0 && (
              <div className="text-sm text-muted-foreground">No items found</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
