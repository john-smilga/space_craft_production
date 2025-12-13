'use client';

import { useCategoriesQuery } from '@/hooks/useCategories';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TopLevelCategorySelectorProps {
  selectedTopLevel: string | null;
  onSelect: (slug: string) => void;
}

export default function TopLevelCategorySelector({ selectedTopLevel, onSelect }: TopLevelCategorySelectorProps) {
  const { data: topLevelData } = useCategoriesQuery();
  const topLevelCategories = topLevelData?.categories || [];

  return (
    <div className='space-y-2'>
      <Label>Type</Label>
      <Select value={selectedTopLevel || undefined} onValueChange={(value) => onSelect(value === '__none__' ? '' : value)}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder='Select a category type' />
        </SelectTrigger>
        <SelectContent>
          {topLevelCategories.map((category) => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
