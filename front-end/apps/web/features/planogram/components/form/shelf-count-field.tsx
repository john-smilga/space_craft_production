'use client';
import { type Control, Controller, type FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { PlanogramFormData } from '../../schemas';

type ShelfCountFieldProps = {
  control: Control<PlanogramFormData>;
  error?: FieldError;
};

export function ShelfCountField({ control, error }: ShelfCountFieldProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='shelf-count-field'>Number of Shelves *</Label>
      <Controller
        name='shelf_count'
        control={control}
        render={({ field }) => (
          <Input
            id='shelf-count-field'
            type='number'
            placeholder='e.g., 4'
            className={cn(error && 'border-destructive')}
            {...field}
            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
          />
        )}
      />
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  );
}
