import Link from 'next/link';
import type { Display } from '@/types/displays';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DisplaySelectorProps {
  companyDisplays: Display[];
  standardDisplays: Display[];
  value: string;
  onChange: (displaySlug: string) => void;
}

export default function DisplaySelector({ companyDisplays, standardDisplays, value, onChange }: DisplaySelectorProps) {
  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between'>
        <Label htmlFor='display'>
          Display/Shelf <span className='text-destructive'>*</span>
        </Label>
        <Link href='/dashboard/displays/new' className='text-sm text-primary hover:underline'>
          Create Custom Display
        </Link>
      </div>
      <Select value={value || undefined} onValueChange={onChange} required>
        <SelectTrigger id='display' className='w-full'>
          <SelectValue placeholder='Select a display' />
        </SelectTrigger>
        <SelectContent>
          {[...companyDisplays, ...standardDisplays]
            .sort((a, b) => {
              // Custom displays first, then standard
              if (a.display_category === 'custom' && b.display_category === 'standard') return -1;
              if (a.display_category === 'standard' && b.display_category === 'custom') return 1;
              return 0;
            })
            .map((display) => (
              <SelectItem key={display.id} value={display.id.toString()}>
                [{display.display_category.charAt(0).toUpperCase() + display.display_category.slice(1)}] {display.name} ({display.type_display}) - {display.width_in}" × {display.height_in}" × {display.depth_in}"{display.display_category === 'custom' ? ` (${display.shelf_count} shelves)` : ''}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}
