'use client';
import { z } from 'zod';
import api from '@/lib/axios';
import { usePaginatedQuery } from '@/lib/react-query/hooks';
import { schemas } from '@/lib/generated/api-schemas';

type PlanogramType = z.infer<typeof schemas.PlanogramList>;

export function usePlanogramsQuery() {
  return usePaginatedQuery<PlanogramType>(
    ['planograms'],
    async () => {
      const response = await api.get('/planograms/');
      return schemas.PaginatedPlanogramListList.parse(response.data);
    }
  );
}
