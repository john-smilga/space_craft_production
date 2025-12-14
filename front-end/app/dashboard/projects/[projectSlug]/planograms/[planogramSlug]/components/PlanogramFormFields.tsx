'use client';

import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePlanogramStore, usePlanogramData, usePlanogramForm } from '@/features/planogram';
import { useParams } from 'next/navigation';

export default function PlanogramFormFields() {
  const params = useParams();
  const planogramSlug = params?.planogramSlug as string;

  const season = usePlanogramStore.use.season();
  const shelfCount = usePlanogramStore.use.shelfCount();
  const selectedDisplay = usePlanogramStore.use.selectedDisplay();
  const setSeason = usePlanogramStore.use.setSeason();
  const setShelfCount = usePlanogramStore.use.setShelfCount();
  const { planogramData, companyDisplays, standardDisplays, refetchPlanogram, fetchAvailableProducts } = usePlanogramData(planogramSlug);
  const { handleDisplayChange } = usePlanogramForm(planogramSlug, planogramData ?? null, refetchPlanogram, fetchAvailableProducts);

  return (
    <>
      {/* Season Selector */}
      <div className='lg:col-span-2 space-y-2'>
        <Label>Season</Label>
        <Select value={season} onValueChange={setSeason}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='spring'>Spring</SelectItem>
            <SelectItem value='summer'>Summer</SelectItem>
            <SelectItem value='fall'>Fall</SelectItem>
            <SelectItem value='winter'>Winter</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Shelf Count Select */}
      <div className='lg:col-span-2 space-y-2'>
        <Label>Shelves</Label>
        <Select value={shelfCount.toString()} onValueChange={(value) => setShelfCount(parseInt(value, 10))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Display Selector */}
      {(companyDisplays.length > 0 || standardDisplays.length > 0) && (
        <div className='lg:col-span-5 space-y-2'>
          <div className='flex items-center gap-12'>
            <Label>Display</Label>
            <Link href='/dashboard/displays/new' className='text-xs text-primary hover:underline'>
              Create Custom Display
            </Link>
          </div>
          <Select value={selectedDisplay} onValueChange={handleDisplayChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select display' />
            </SelectTrigger>
            <SelectContent className='min-w-[20rem]'>
              {[...companyDisplays, ...standardDisplays]
                .sort((a, b) => {
                  // Custom displays first, then standard
                  if (a.display_category === 'custom' && b.display_category === 'standard') return -1;
                  if (a.display_category === 'standard' && b.display_category === 'custom') return 1;
                  return 0;
                })
                .map((display) => (
                  <SelectItem key={display.id} value={display.id.toString()}>
                    [{display.display_category.charAt(0).toUpperCase() + display.display_category.slice(1)}] {display.name} ({display.type.replace(/_/g, ' ')}) - {display.width_in}&quot; × {display.height_in}&quot; × {display.depth_in}&quot;
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
}
