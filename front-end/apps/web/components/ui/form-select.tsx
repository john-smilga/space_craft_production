import * as React from 'react';
import { type FieldError, type Control, type FieldValues, type Path, Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

type FormSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  control: Control<TFieldValues>;
  error?: FieldError;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  containerClassName?: string;
};

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  label,
  control,
  error,
  options,
  placeholder = 'Select an option...',
  containerClassName,
}: FormSelectProps<TFieldValues>) {
  const selectId = `field-${name}`;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      <Label htmlFor={selectId}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger id={selectId} className={cn(error && 'border-destructive')}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  );
}
