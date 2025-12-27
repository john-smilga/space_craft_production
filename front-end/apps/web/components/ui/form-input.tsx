import * as React from 'react';
import { type FieldError, type UseFormRegister, type FieldValues, type Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FormInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  containerClassName?: string;
} & Omit<React.ComponentProps<typeof Input>, 'name'>;

export function FormInput<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  error,
  containerClassName,
  className,
  ...inputProps
}: FormInputProps<TFieldValues>) {
  const inputId = `field-${name}`;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input
        id={inputId}
        className={cn(error && 'border-destructive', className)}
        {...register(name)}
        {...inputProps}
      />
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  );
}
