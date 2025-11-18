import * as React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface FormFieldProps extends React.ComponentProps<typeof Input> {
  label: string;
  containerClassName?: string;
}

export function FormField({
  label,
  id,
  containerClassName,
  className,
  ...inputProps
}: FormFieldProps) {
  const inputId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className={cn('space-y-2', containerClassName)}>
      <Label htmlFor={inputId}>{label}</Label>
      <Input id={inputId} className={className} {...inputProps} />
    </div>
  );
}

