'use client';

import type { UseFormRegister, FieldError } from 'react-hook-form';
import { FormInput } from '@/components/ui/form-input';
import type { PlanogramFormData } from '@/app/dashboard/projects/[projectSlug]/planograms/[planogramSlug]/page';

type PlanogramNameFieldProps = {
  register: UseFormRegister<PlanogramFormData>;
  error?: FieldError;
};

export function PlanogramNameField({ register, error }: PlanogramNameFieldProps) {
  return (
    <FormInput
      name='name'
      label='Name *'
      type='text'
      register={register}
      error={error}
      placeholder='Planogram name'
      containerClassName='lg:col-span-2'
    />
  );
}

