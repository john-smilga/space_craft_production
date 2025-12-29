'use client';
import { type Control, Controller, type FieldError } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useDisplaysQuery } from '@/features/displays/queries';
import { cn } from '@/lib/utils';
import type { PlanogramFormData } from '../../schemas';

type PlanogramDisplayFieldProps = {
  control: Control<PlanogramFormData>;
  error?: FieldError;
};

export function PlanogramDisplayField({ control, error }: PlanogramDisplayFieldProps) {
  const { data: displays = [], isLoading } = useDisplaysQuery();

  const companyDisplays = displays.filter((d) => d.display_category === 'custom');
  const standardDisplays = displays.filter((d) => d.display_category === 'standard');

  return (
    <div className='space-y-2'>
      <Label htmlFor='display-field'>Display *</Label>
      <Controller
        name='display'
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(stringValue) => {
              field.onChange(Number(stringValue));
            }}
            value={field.value?.toString() ?? ''}
            disabled={isLoading}
          >
            <SelectTrigger
              id='display-field'
              className={cn('w-full', error && 'border-destructive')}
            >
              <SelectValue placeholder={isLoading ? 'Loading displays...' : 'Select a display'} />
            </SelectTrigger>
            <SelectContent>
              {companyDisplays.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Company Displays</SelectLabel>
                  {companyDisplays.map((display) => (
                    <SelectItem key={display.id} value={display.id.toString()}>
                      {display.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
              {standardDisplays.length > 0 && (
                <SelectGroup>
                  <SelectLabel>Standard Displays</SelectLabel>
                  {standardDisplays.map((display) => (
                    <SelectItem key={display.id} value={display.id.toString()}>
                      {display.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className='text-sm text-destructive'>{error.message}</p>}
    </div>
  );
}
