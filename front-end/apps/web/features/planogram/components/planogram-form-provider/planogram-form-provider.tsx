'use client';

import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useForm, FormProvider, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';
import { usePlanogramStore } from '../../store';

const planogramFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  season: schemas.SeasonEnum,
  selectedDisplay: z.string().optional(),
  shelfCount: z.number().int().min(1, 'At least 1 shelf required').max(10),
  selectedCategoryIds: z.array(z.number().int()),
});

export type PlanogramFormData = z.infer<typeof planogramFormSchema>;

type PlanogramFormProviderProps = {
  children: ReactNode;
  defaultValues?: Partial<PlanogramFormData>;
}

type PlanogramFormContextType = UseFormReturn<PlanogramFormData>;

const PlanogramFormContext = createContext<PlanogramFormContextType | null>(null);

export function usePlanogramFormContext() {
  const context = useContext(PlanogramFormContext);
  if (!context) {
    throw new Error('usePlanogramFormContext must be used within PlanogramFormProvider');
  }
  return context;
}

export function PlanogramFormProvider({ children, defaultValues }: PlanogramFormProviderProps) {
  const methods = useForm<PlanogramFormData>({
    resolver: zodResolver(planogramFormSchema),
    defaultValues: {
      name: defaultValues?.name || '',
      season: defaultValues?.season || 'summer',
      selectedDisplay: defaultValues?.selectedDisplay || '',
      shelfCount: defaultValues?.shelfCount || 1,
      selectedCategoryIds: defaultValues?.selectedCategoryIds || [],
    },
  });

  // Sync form values to Zustand for canvas integration
  const setName = usePlanogramStore.use.setName();
  const setSeason = usePlanogramStore.use.setSeason();
  const setSelectedDisplay = usePlanogramStore.use.setSelectedDisplay();
  const setShelfCount = usePlanogramStore.use.setShelfCount();
  const setSelectedCategoryIds = usePlanogramStore.use.setSelectedCategoryIds();

  const formValues = methods.watch();

  useEffect(() => {
    setName(formValues.name);
  }, [formValues.name, setName]);

  useEffect(() => {
    setSeason(formValues.season);
  }, [formValues.season, setSeason]);

  useEffect(() => {
    if (formValues.selectedDisplay) {
      setSelectedDisplay(formValues.selectedDisplay);
    }
  }, [formValues.selectedDisplay, setSelectedDisplay]);

  useEffect(() => {
    setShelfCount(formValues.shelfCount);
  }, [formValues.shelfCount, setShelfCount]);

  useEffect(() => {
    setSelectedCategoryIds(formValues.selectedCategoryIds);
  }, [formValues.selectedCategoryIds, setSelectedCategoryIds]);

  return (
    <PlanogramFormContext.Provider value={methods}>
      <FormProvider {...methods}>
        {children}
      </FormProvider>
    </PlanogramFormContext.Provider>
  );
}
