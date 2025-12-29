'use client';
import { type Control, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useLeafCategoriesQuery } from '../../queries/use-leaf-categories-query';
import { cn } from '@/lib/utils';
import type { PlanogramFormData } from '../../schemas';

type PlanogramCategoriesFieldProps = {
  control: Control<PlanogramFormData>;
  error?: { message?: string };
};

export function PlanogramCategoriesField({ control, error }: PlanogramCategoriesFieldProps) {
  const { data: categories = [], isLoading, error: queryError } = useLeafCategoriesQuery();

  if (queryError) {
    console.error('Categories query error:', queryError);
  }

  return (
    <Controller
      name='category_ids'
      control={control}
      render={({ field }) => {
        const selectedIds = field.value || [];

        const addCategory = (categoryId: number) => {
          if (!selectedIds.includes(categoryId)) {
            field.onChange([...selectedIds, categoryId]);
          }
        };

        const removeCategory = (categoryId: number) => {
          field.onChange(selectedIds.filter((id) => id !== categoryId));
        };

        return (
          <div className='space-y-2'>
            <Label htmlFor='categories-field'>Categories *</Label>
            <Select
              value=''
              onValueChange={(value) => addCategory(Number(value))}
              disabled={isLoading}
            >
              <SelectTrigger
                id='categories-field'
                className={cn(error && 'border-destructive')}
              >
                <SelectValue placeholder={isLoading ? 'Loading categories...' : 'Select categories'} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id.toString()}
                    disabled={selectedIds.includes(category.id)}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedIds.length > 0 && (
              <div className='flex flex-wrap gap-2 pt-2'>
                {selectedIds.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId);
                  return (
                    <Badge key={categoryId} variant='secondary' className='inline-flex items-center gap-2'>
                      {category?.name || `Category ${categoryId}`}
                      <button
                        type='button'
                        onClick={() => removeCategory(categoryId)}
                        className='hover:text-destructive'
                        aria-label={`Remove ${category?.name || 'category'}`}
                      >
                        ×
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            {error && <p className='text-sm text-destructive'>{error.message ?? 'Invalid categories'}</p>}
          </div>
        );
      }}
    />
  );
}
