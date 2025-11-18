'use client';

import { useMemo } from 'react';
import GridLayout, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePlanogramData } from '../hooks/usePlanogramData';
import { useParams } from 'next/navigation';

const GridLayoutWithProvider = WidthProvider(GridLayout);

const CELL_WIDTH_IN = 6.0; // Same as backend

export default function ShelvesTable() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;
  const { planogramData } = usePlanogramData(planogramSlug);

  const planogram = planogramData?.planogram;
  const shelfCount = planogram?.shelf_count;
  const widthIn = planogram?.width_in;

  const cols = useMemo(() => {
    if (!widthIn) return 1;
    const normalizedWidth = Math.min(Math.max(widthIn, 24), 240);
    return Math.max(1, Math.floor(normalizedWidth / CELL_WIDTH_IN));
  }, [widthIn]);

  if (!shelfCount || !widthIn) {
    return null;
  }

  const shelves = Array.from({ length: shelfCount }, (_, i) => i + 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shelves</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {shelves.map((shelf) => (
            <div key={shelf} className='space-y-2'>
              <h3 className='font-medium'>Shelf {shelf}</h3>
              <GridLayoutWithProvider className='layout border-2 border-gray-300 bg-gray-50 rounded' layout={[]} cols={cols} rowHeight={100} isResizable={false} isDraggable={false} margin={[4, 4]}>
                {/* Empty grid - no items */}
              </GridLayoutWithProvider>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
