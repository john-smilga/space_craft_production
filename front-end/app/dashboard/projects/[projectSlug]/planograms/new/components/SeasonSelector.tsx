import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SeasonSelectorProps {
  value: string;
  onChange: (season: string) => void;
}

const SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;

export default function SeasonSelector({ value, onChange }: SeasonSelectorProps) {
  return (
    <div className='space-y-2'>
      <Label>
        Season <span className='text-destructive'>*</span>
      </Label>
      <RadioGroup value={value} onValueChange={onChange} className='flex gap-4'>
        {SEASONS.map((season) => (
          <div key={season} className='flex items-center space-x-2'>
            <RadioGroupItem value={season} id={season} />
            <label htmlFor={season} className='capitalize cursor-pointer'>
              {season}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
