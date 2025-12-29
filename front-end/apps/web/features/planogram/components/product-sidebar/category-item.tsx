'use client';

import { useState, useMemo } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useCategoryPathQuery } from '@/features/planogram/queries/use-category-path-query';
import { schemas } from '@/lib/generated/api-schemas';
import { z } from 'zod';

type ProductType = z.infer<typeof schemas.Product>;

type CategoryItemProps = {
  path: string;
  categoryName: string;
  season: string;
};

export function CategoryItem({ path, categoryName, season }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading } = useCategoryPathQuery({
    categoryPath: path,
    season,
    enabled: isExpanded,
  });

  const items = data?.items || [];
  const isProducts = data?.products || false;

  const extractedCategoryName = useMemo(
    () =>
      path
        .split('/')
        .pop()
        ?.replace(/_/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase()) || '',
    [path]
  );

  const products: ProductType[] = useMemo(() => {
    const currentItems = data?.items || [];
    const currentIsProducts = data?.products || false;

    if (!currentIsProducts) return [];
    return currentItems
      .filter(
        (item): item is {
          id: number;
          name: string;
          pack_width_in?: number;
          pack_height_in?: number;
          margin?: number;
          sales_velocity?: number;
          overall_score?: number;
        } => 'id' in item
      )
      .map((item) => ({
        id: item.id,
        name: item.name,
        pack_width_in: item.pack_width_in || 0,
        pack_height_in: item.pack_height_in || 0,
        margin: item.margin || 0,
        sales_velocity: item.sales_velocity || 0,
        overall_score: item.overall_score || 0,
        category: extractedCategoryName,
        color: undefined,
      }));
  }, [data?.items, data?.products, extractedCategoryName]);

  const groupedProducts = useMemo(() => {
    const groups: Record<string, ProductType[]> = {
      '90-100%': [],
      '80-89%': [],
      '70-79%': [],
      '60-69%': [],
      'Below 60%': [],
      'No Score': [],
    };

    products.forEach((product) => {
      const score = product.overall_score ?? 0;
      if (score === 0) {
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
    <div className="space-y-1">
      <label className="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded">
        <Checkbox
          checked={isExpanded}
          onCheckedChange={() => setIsExpanded(!isExpanded)}
        />
        <span className="text-sm font-medium">{categoryName}</span>
      </label>

      {isExpanded && (
        <div className="ml-6 space-y-2">
          {isLoading && (
            <div className="text-xs text-muted-foreground pl-2">Loading...</div>
          )}

          {!isLoading &&
            !isProducts &&
            items.map((item) => {
              if ('key' in item && typeof item.key === 'string') {
                const categoryItem = item as { key: string; name: string };
                return (
                  <CategoryItem
                    key={categoryItem.key}
                    path={`${path}/${categoryItem.key}`}
                    categoryName={categoryItem.name}
                    season={season}
                  />
                );
              }
              return null;
            })}

          {!isLoading && isProducts && products.length > 0 && (
            <div className="space-y-4 pl-2">
              {Object.entries(groupedProducts).map(([scoreRange, groupProducts]) => {
                if (groupProducts.length === 0) return null;
                return (
                  <div key={scoreRange} className="space-y-2">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {scoreRange} ({groupProducts.length})
                    </div>
                    <div className="space-y-2">
                      {groupProducts.map((product) => (
                        <div
                          key={product.id}
                          className="p-3 rounded border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="font-medium text-sm mb-1">
                            {product.name}
                          </div>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>
                              Score:{' '}
                              {product.overall_score !== undefined
                                ? (product.overall_score * 100).toFixed(0)
                                : 'N/A'}
                              %
                            </span>
                            <span>
                              Margin:{' '}
                              {product.margin !== undefined
                                ? (product.margin * 100).toFixed(1)
                                : 'N/A'}
                              %
                            </span>
                            <span>
                              Width:{' '}
                              {product.pack_width_in
                                ? `${product.pack_width_in.toFixed(1)}"`
                                : 'N/A'}
                            </span>
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
