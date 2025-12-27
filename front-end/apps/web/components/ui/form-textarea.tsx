import * as React from 'react';
import { type FieldError, type UseFormRegister, type FieldValues, type Path } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type FormTextareaProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  containerClassName?: string;
} & Omit<React.ComponentProps<typeof Textarea>, 'name'>;

export function FormTextarea<TFieldValues extends FieldValues>({
  name,
  label,
  register,
  error,
  containerClassName,
  className,
  ...textareaProps
}: FormTextareaProps<TFieldValues>) {
  const textareaId = `field-${name}`;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      <Label htmlFor={textareaId}>{label}</Label>
      <Textarea
        id={textareaId}
        className={cn(error && 'border-destructive', className)}
        {...register(name)}
        {...textareaProps}
      />
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  );
}
