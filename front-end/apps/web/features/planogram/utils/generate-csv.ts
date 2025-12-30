import { z } from 'zod';
import { schemas } from '@/lib/generated/api-schemas';
import { generatePlanogramCSV as generateCSV } from '@/lib/planogramCSV';

type Planogram = z.infer<typeof schemas.Planogram>;
type Layout = z.infer<typeof schemas.Layout>;

export function generatePlanogramCSV(
  planogram: Planogram | null | undefined,
  layout: Layout | null
): string {
  return generateCSV(planogram, layout as Parameters<typeof generateCSV>[1]);
}

export function downloadCSV(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
