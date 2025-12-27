import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type NameInputProps = {
  value: string;
  onChange: (value: string) => void;
}

export function NameInput({ value, onChange }: NameInputProps) {
  return (
    <div className='space-y-2'>
      <Label htmlFor='name'>
        Name <span className='text-destructive'>*</span>
      </Label>
      <Input id='name' type='text' value={value} onChange={(e) => onChange(e.target.value)} required placeholder='e.g., Summer Meat Display - Aisle 3' />
    </div>
  );
}

