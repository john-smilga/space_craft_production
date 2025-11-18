'use client';

import { FormField } from '@/components/ui/form-field';
import { usePlanogramFormStore } from '@/stores/planogramFormStore';

export default function PlanogramNameField() {
  const { name, setName } = usePlanogramFormStore();

  return (
    <FormField
      label='Name'
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder='Planogram name'
      required
      containerClassName='lg:col-span-2'
    />
  );
}
