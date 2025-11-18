'use client';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { usePlanogramFormStore } from '@/stores/planogramFormStore';
import { usePlanogramData } from '../hooks/usePlanogramData';
import { useParams } from 'next/navigation';

export default function PlanogramCategoriesSelector() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const { selectedCategoryIds, toggleCategory } = usePlanogramFormStore();
  const { planogramData, leafCategories, leafCategoriesLoading, leafCategoriesError } = usePlanogramData(planogramSlug);
  const planogram = planogramData?.planogram;

  return (
    <>
      <div className='space-y-2'>
        <Label>Categories</Label>
        {leafCategoriesError ? (
          <p className='text-sm text-destructive'>Error loading categories: {leafCategoriesError}</p>
        ) : leafCategoriesLoading ? (
          <p className='text-sm text-muted-foreground'>Loading categories...</p>
        ) : leafCategories.length > 0 ? (
          <Select
            value=''
            onValueChange={(value) => {
              const categoryId = parseInt(value);
              if (!selectedCategoryIds.includes(categoryId)) {
                toggleCategory(categoryId);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              {leafCategories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <p className='text-sm text-muted-foreground'>No categories available</p>
        )}
      </div>

      {/* Selected Categories List */}
      {selectedCategoryIds.length > 0 && (
        <div className='mt-4 pt-4 border-t'>
          <Label className='text-xs text-muted-foreground mb-2'>Selected Categories</Label>
          <div className='flex flex-wrap gap-2'>
            {selectedCategoryIds.map((categoryId) => {
              const leafCategory = leafCategories.find((c) => c.id === categoryId);
              const planogramCategory = planogram?.categories?.find((c) => c.id === categoryId);
              const categoryName = leafCategory?.name || planogramCategory?.name || `Category ${categoryId}`;
              return (
                <Badge key={categoryId} variant='secondary' className='inline-flex items-center gap-2'>
                  {categoryName}
                  <button type='button' onClick={() => toggleCategory(categoryId)} className='hover:text-destructive cursor-pointer'>
                    ×
                  </button>
                </Badge>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
