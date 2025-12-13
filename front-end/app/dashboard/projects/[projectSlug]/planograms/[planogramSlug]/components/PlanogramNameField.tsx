'use client';

import { FormField } from '@/components/ui/form-field';
import { usePlanogramStore } from '@/features/planogram';

export default function PlanogramNameField() {
  const name = usePlanogramStore.use.name();
  const setName = usePlanogramStore.use.setName();

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
