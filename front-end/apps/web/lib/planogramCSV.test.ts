import { describe, it, expect } from 'vitest';
import { generatePlanogramCSV } from './planogramCSV';
import type { GridResponse } from '@/features/planogram-old/types';
import type { schemas } from '@/lib/generated/api-schemas';
import type { z } from 'zod';

type PlanogramType = z.infer<typeof schemas.Planogram>;

describe('generatePlanogramCSV', () => {
  it('should return error message when planogram is null', () => {
    const result = generatePlanogramCSV(null, null);
    expect(result).toBe('No planogram data available');
  });

  it('should return error message when planogram is undefined', () => {
    const result = generatePlanogramCSV(undefined, null);
    expect(result).toBe('No planogram data available');
  });

  it('should generate CSV with metadata only when layout is null', () => {
    const planogram = {
      name: 'Test Planogram',
      project_name: 'Test Project',
      season: 'Spring 2024',
      categories: [{ name: 'beef' }, { name: 'pork' }],
      display_name: 'Standard Display',
      width_in: 48,
      height_in: 72,
      depth_in: 24,
      shelf_count: 5,
      shelf_spacing: 12,
    } as unknown as PlanogramType;

    const result = generatePlanogramCSV(planogram, null);
    
    expect(result).toContain('Planogram Name,Project,Season,Categories,Display,Dimensions (W×H×D),Shelves,Shelf Spacing');
    expect(result).toContain('"Test Planogram"');
    expect(result).toContain('"Test Project"');
    expect(result).toContain('Spring 2024');
    expect(result).toContain('"beef; pork"');
    expect(result).toContain('"Standard Display"');
    expect(result).toContain('48"×72"×24"');
    expect(result).toContain('5');
    expect(result).toContain('12');
    expect(result).toContain('Row/Shelf,Product Name,Category,Position X,Position Y,Width,Height,Score');
  });

  it('should generate complete CSV with products when layout is provided', () => {
    const planogram = {
      name: 'Full Planogram',
      project_name: 'Project A',
      season: 'Fall 2024',
      categories: [{ name: 'poultry' }],
      display_name: 'Large Display',
      width_in: 60,
      height_in: 84,
      depth_in: 30,
      shelf_count: 6,
      shelf_spacing: 14,
    } as unknown as PlanogramType;

    const layout: GridResponse = {
      rows: [
        {
          id: 1,
          category: 'poultry',
          name: 'Shelf 1',
          items: [
            {
              i: '1',
              x: 0,
              y: 0,
              w: 2,
              h: 1,
              meta: {
                id: 1,
                name: 'Product A',
                category: 'poultry',
                score: 85,
                pack_width_in: 2,
                pack_height_in: 1,
              },
            },
            {
              i: '2',
              x: 2,
              y: 0,
              w: 3,
              h: 1,
              meta: {
                id: 2,
                name: 'Product B',
                category: 'poultry',
                score: 92,
                pack_width_in: 3,
                pack_height_in: 1,
              },
            },
          ],
        },
      ],
      grid: { cols: 10, rows: 6, cellWidthIn: 4 },
    };

    const result = generatePlanogramCSV(planogram, layout);
    
    expect(result).toContain('"Full Planogram"');
    expect(result).toContain('"Shelf 1","Product A","poultry",0,0,2,1,85');
    expect(result).toContain('"Shelf 1","Product B","poultry",2,0,3,1,92');
  });

  it('should handle special characters in product names by escaping quotes', () => {
    const planogram = {
      name: 'Test "Special" Planogram',
      project_name: 'Project "Alpha"',
      season: 'Summer',
      categories: [{ name: 'beef' }],
      display_name: 'Display "Premium"',
      width_in: 50,
      height_in: 70,
      depth_in: 25,
      shelf_count: 4,
      shelf_spacing: 10,
    } as unknown as PlanogramType;

    const layout: GridResponse = {
      rows: [
        {
          id: 1,
          category: 'beef',
          name: 'Row "Top"',
          items: [
            {
              i: '1',
              x: 0,
              y: 0,
              w: 2,
              h: 1,
              meta: {
                id: 1,
                name: 'Product "Best"',
                category: 'beef',
                score: 95,
                pack_width_in: 2,
                pack_height_in: 1,
              },
            },
          ],
        },
      ],
      grid: { cols: 10, rows: 4, cellWidthIn: 5 },
    };

    const result = generatePlanogramCSV(planogram, layout);
    
    expect(result).toContain('"Test ""Special"" Planogram"');
    expect(result).toContain('"Project ""Alpha"""');
    expect(result).toContain('"Display ""Premium"""');
    expect(result).toContain('"Row ""Top""","Product ""Best"""');
  });

  it('should handle missing optional fields with N/A fallbacks', () => {
    const planogram = {
      name: 'Minimal Planogram',
      project_name: null,
      season: null,
      categories: [],
      display_name: null,
      width_in: null,
      height_in: null,
      depth_in: null,
      shelf_count: null,
      shelf_spacing: null,
    } as unknown as PlanogramType;

    const result = generatePlanogramCSV(planogram, null);
    
    expect(result).toContain('"Unknown"');
    expect(result).toContain('N/A');
    expect(result).not.toContain('null');
    expect(result).not.toContain('undefined');
  });

  it('should handle products with missing score', () => {
    const planogram = {
      name: 'Score Test',
      project_name: 'Project',
      season: 'Winter',
      categories: [{ name: 'sausage' }],
      display_name: 'Display',
      width_in: 40,
      height_in: 60,
      depth_in: 20,
      shelf_count: 3,
      shelf_spacing: 8,
    } as unknown as PlanogramType;

    const layout: GridResponse = {
      rows: [
        {
          id: 1,
          category: 'sausage',
          name: 'Shelf 1',
          items: [
            {
              i: '1',
              x: 0,
              y: 0,
              w: 2,
              h: 1,
              meta: {
                id: 1,
                name: 'Product Without Score',
                category: 'sausage',
                score: 0,
                pack_width_in: 2,
                pack_height_in: 1,
              },
            },
          ],
        },
      ],
      grid: { cols: 8, rows: 3, cellWidthIn: 5 },
    };

    const result = generatePlanogramCSV(planogram, layout);
    
    expect(result).toContain('"Shelf 1","Product Without Score","sausage",0,0,2,1,N/A');
  });

  it('should handle products with missing category', () => {
    const planogram = {
      name: 'Category Test',
      project_name: 'Project',
      season: 'Spring',
      categories: [{ name: 'lamb' }],
      display_name: 'Display',
      width_in: 45,
      height_in: 65,
      depth_in: 22,
      shelf_count: 4,
      shelf_spacing: 9,
    } as unknown as PlanogramType;

    const layout: GridResponse = {
      rows: [
        {
          id: 2,
          category: 'lamb',
          name: 'Shelf 2',
          items: [
            {
              i: '1',
              x: 1,
              y: 1,
              w: 1,
              h: 2,
              meta: {
                id: 1,
                name: 'Product No Category',
                category: '',
                score: 75,
                pack_width_in: 1,
                pack_height_in: 2,
              },
            },
          ],
        },
      ],
      grid: { cols: 9, rows: 4, cellWidthIn: 5 },
    };

    const result = generatePlanogramCSV(planogram, layout);
    
    expect(result).toContain('"Shelf 2","Product No Category","N/A",1,1,1,2,75');
  });

  it('should handle empty layout rows array', () => {
    const planogram = {
      name: 'Empty Layout',
      project_name: 'Project',
      season: 'Fall',
      categories: [{ name: 'seafood' }],
      display_name: 'Display',
      width_in: 50,
      height_in: 70,
      depth_in: 25,
      shelf_count: 5,
      shelf_spacing: 11,
    } as unknown as PlanogramType;

    const layout: GridResponse = {
      rows: [],
      grid: { cols: 10, rows: 5, cellWidthIn: 5 },
    };

    const result = generatePlanogramCSV(planogram, layout);
    
    expect(result).toContain('Planogram Name,Project,Season,Categories,Display,Dimensions (W×H×D),Shelves,Shelf Spacing');
    expect(result).toContain('Row/Shelf,Product Name,Category,Position X,Position Y,Width,Height,Score');
    expect(result).not.toContain('"Shelf');
  });

  it('should handle dimensions when depth is missing', () => {
    const planogram = {
      name: 'No Depth',
      project_name: 'Project',
      season: 'Summer',
      categories: [{ name: 'beef' }],
      display_name: 'Display',
      width_in: 55,
      height_in: 75,
      depth_in: null,
      shelf_count: 4,
      shelf_spacing: 10,
    } as unknown as PlanogramType;

    const result = generatePlanogramCSV(planogram, null);
    
    expect(result).toContain('55"×75"');
    expect(result).not.toContain('×null');
  });

  it('should handle categories as non-array', () => {
    const planogram = {
      name: 'Non-Array Categories',
      project_name: 'Project',
      season: 'Winter',
      categories: 'not an array' as unknown as Array<{ name: string }>,
      display_name: 'Display',
      width_in: 50,
      height_in: 70,
      depth_in: 25,
      shelf_count: 5,
      shelf_spacing: 12,
    } as unknown as PlanogramType;

    const result = generatePlanogramCSV(planogram, null);
    
    expect(result).toContain('N/A');
  });
});

