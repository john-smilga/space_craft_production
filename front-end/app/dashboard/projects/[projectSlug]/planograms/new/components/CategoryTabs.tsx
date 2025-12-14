'use client';

import { useCategoriesQuery, useSelectableCategoriesQuery } from '@/hooks/useCategories';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface CategoryTabsProps {
  parentSlug: string;
  activeTab: string | null;
  onTabClick: (tabSlug: string) => void;
  selectedCategoryIds: number[];
  onCategoryToggle: (categoryId: number) => void;
}

export default function CategoryTabs({ parentSlug, activeTab, onTabClick, selectedCategoryIds, onCategoryToggle }: CategoryTabsProps) {
  const { data: subcategoriesData } = useCategoriesQuery(parentSlug);
  const subcategories = subcategoriesData?.categories || [];

  const { data: selectableData } = useSelectableCategoriesQuery(parentSlug, activeTab);
  const selectableCategories = selectableData?.categories || [];

  const getCategoryIcon = (slug: string): string => {
    const icons: Record<string, string> = {
      meat: '🥩',
      seafood: '🐟',
      produce: '🥬',
    };
    return icons[slug] || '📦';
  };

  return (
    <div>
      <Label className='mb-2'>
        Options <span className='text-muted-foreground font-normal'>(Select one)</span>
      </Label>
      <div className='flex gap-2 border-b border-border mb-4'>
        {subcategories.map((category: { slug: string; name: string }) => (
          <Button key={category.slug} type='button' onClick={() => onTabClick(category.slug)} variant='ghost' className={`px-4 py-2 font-medium text-sm border-b-2 rounded-none transition-colors ${activeTab === category.slug ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
            {getCategoryIcon(category.slug)} {category.name}
          </Button>
        ))}
      </div>

      {activeTab && (
        <div>
          <Label className='mb-2'>Select Categories</Label>
          <div className='space-y-2 p-4 bg-muted rounded-lg border'>
            {selectableCategories.length === 1 && selectableCategories[0].slug === activeTab ? (
              <label className='flex items-center cursor-pointer hover:bg-background px-2 py-1 rounded'>
                <Checkbox checked={selectedCategoryIds.includes(selectableCategories[0].id)} onCheckedChange={() => onCategoryToggle(selectableCategories[0].id)} className='mr-2' />
                <span>All {selectableCategories[0].name}</span>
              </label>
            ) : (
              selectableCategories.map((category) => (
                <label key={category.id} className='flex items-center cursor-pointer hover:bg-background px-2 py-1 rounded'>
                  <Checkbox checked={selectedCategoryIds.includes(category.id)} onCheckedChange={() => onCategoryToggle(category.id)} className='mr-2' />
                  <span>{category.name}</span>
                </label>
              ))
            )}
          </div>
        </div>
      )}

      {selectedCategoryIds.length > 0 && selectableCategories.length > 0 && (
        <div className='mt-4'>
          <p className='text-sm font-medium mb-2'>Selected Categories:</p>
          <div className='flex flex-wrap gap-2'>
            {selectableCategories
              .filter((cat) => selectedCategoryIds.includes(cat.id))
              .map((category) => (
                <Badge key={category.id} variant='secondary' className='inline-flex items-center gap-2'>
                  {category.name}
                  <button type='button' onClick={() => onCategoryToggle(category.id)} className='hover:text-destructive cursor-pointer'>
                    ×
                  </button>
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
