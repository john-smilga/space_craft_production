import type { Planogram } from '@/types/planograms';
import type { GridResponse } from '@/types/planograms';

export function generatePlanogramCSV(planogram: Planogram | null | undefined, layout: GridResponse | null): string {
  if (!planogram) {
    return 'No planogram data available';
  }

  const rows: string[] = [];

  // Header row
  rows.push('Planogram Name,Project,Season,Categories,Display,Dimensions (W×H×D),Shelves,Shelf Spacing');

  // Metadata row
  const categories = planogram.categories?.map((c) => c.name).join('; ') || 'N/A';
  const displayName = planogram.display?.name || 'N/A';
  // Get dimensions from display object (where backend puts them) or top level as fallback
  const widthIn = planogram.display?.width_in ?? planogram.width_in;
  const heightIn = planogram.display?.height_in ?? planogram.height_in;
  const depthIn = planogram.display?.depth_in ?? planogram.depth_in;
  const dimensions = widthIn && heightIn ? `${widthIn}"×${heightIn}"${depthIn ? `×${depthIn}"` : ''}` : 'N/A';

  const projectName = planogram.project?.name || planogram.project_name || 'Unknown';
  const seasonDisplay = planogram.season_display || planogram.season || 'N/A';
  const shelfCount = planogram.shelf_count ?? 'N/A';
  const shelfSpacing = planogram.shelf_spacing?.toString() || 'N/A';
  rows.push([`"${planogram.name.replace(/"/g, '""')}"`, `"${projectName.replace(/"/g, '""')}"`, seasonDisplay, `"${categories.replace(/"/g, '""')}"`, `"${displayName.replace(/"/g, '""')}"`, dimensions, shelfCount.toString(), shelfSpacing].join(','));

  // Empty row
  rows.push('');

  // Products table header
  rows.push('Row/Shelf,Product Name,Category,Position X,Position Y,Width,Height,Score');

  // Products data
  if (layout && layout.rows.length > 0) {
    layout.rows.forEach((row) => {
      row.items.forEach((item) => {
        const score = item.meta?.score != null ? item.meta.score.toString() : 'N/A';
        rows.push([`"${row.name.replace(/"/g, '""')}"`, `"${item.meta.name.replace(/"/g, '""')}"`, `"${(item.meta.category || 'N/A').replace(/"/g, '""')}"`, item.x.toString(), item.y.toString(), item.w.toString(), item.h.toString(), score].join(','));
      });
    });
  }

  return rows.join('\n');
}
