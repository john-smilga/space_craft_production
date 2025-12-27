'use client';

import { FormInput } from '@/components/ui/form-input';
import { usePlanogramFormContext } from '../planogram-form-provider';

export function PlanogramNameField() {
  const { register, formState: { errors } } = usePlanogramFormContext();

  return (
    <FormInput
      name='name'
      label='Name *'
      type='text'
      register={register}
      error={errors.name}
      placeholder='Planogram name'
      containerClassName='lg:col-span-2'
    />
  );
}

