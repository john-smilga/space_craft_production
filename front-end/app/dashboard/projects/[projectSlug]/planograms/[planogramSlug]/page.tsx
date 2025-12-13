'use client';

import { useParams } from 'next/navigation';
import { usePlanogramStore, usePlanogramData } from '@/features/planogram';
import Grid from './components/Grid';
import ThreeJSView from './components/ThreeJSView';
import ProductSidebar from './components/ProductSidebar';
import AvailableProductsSidebar from './components/AvailableProductsSidebar';
import PlanogramNameField from './components/PlanogramNameField';
import PlanogramFormFields from './components/PlanogramFormFields';
import PlanogramCategoriesSelector from './components/PlanogramCategoriesSelector';
import PlanogramActions from './components/PlanogramActions';
import PlanogramDeleteButton from './components/PlanogramDeleteButton';
import PlanogramHeader from './components/PlanogramHeader';
import { Card, CardContent } from '@/components/ui/card';

function PlanogramDetailContent() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  // Get state from consolidated store
  const gridData = usePlanogramStore.use.gridData();
  const rowLayouts = usePlanogramStore.use.rowLayouts();
  const sidebarOpen = usePlanogramStore.use.sidebarOpen();
  const availableProductsSidebarOpen = usePlanogramStore.use.availableProductsSidebarOpen();

  // Use custom hooks
  const { planogramData, planogramLoading } = usePlanogramData(planogramSlug);

  // Loading state
  if (planogramLoading) {
    return (
      <div className='flex justify-center items-center py-12'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  // Error state
  if (!planogramData) {
    return (
      <div className='bg-card rounded-lg border border-border p-6'>
        <p className='text-muted-foreground'>Planogram not found</p>
      </div>
    );
  }

  const planogram = planogramData.planogram;

  return (
    <div className='relative'>
      {/* Sidebar - Fixed, overlays navbar */}
      {sidebarOpen && <ProductSidebar />}

      {/* Available Products Sidebar - Fixed, on right side */}
      {availableProductsSidebarOpen && <AvailableProductsSidebar />}

      {/* Main Content - aligned with navbar */}
      <div className='transition-all duration-300'>
        <div className='max-w-7xl mx-auto px-6 md:px-0 py-8'>
          <PlanogramHeader planogram={planogram} />

          {/* Horizontal Form at top */}
          {planogram && (
            <Card className='mb-8'>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4'>
                    <PlanogramNameField />
                    <PlanogramFormFields />
                  </div>
                  <PlanogramCategoriesSelector />
                </div>
                <PlanogramActions />
              </CardContent>
            </Card>
          )}

          <div className='space-y-6'>
            {gridData ? (
              <>
                <Grid />
                {Object.keys(rowLayouts).length > 0 && <ThreeJSView gridData={gridData} rowLayouts={rowLayouts} />}
              </>
            ) : (
              <Card>
                <CardContent className='p-6'>
                  <p className='text-muted-foreground'>No layout data available for this planogram.</p>
                </CardContent>
              </Card>
            )}
          </div>

          <PlanogramDeleteButton />
        </div>
      </div>
    </div>
  );
}

export default function PlanogramDetailPage() {
  return <PlanogramDetailContent />;
}
