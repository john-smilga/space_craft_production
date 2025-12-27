import type { AvailableItem } from '@/features/planogram/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type ItemMenuProps = {
  itemId: string;
  itemName: string;
  unplacedItems: AvailableItem[];
  onReplace: (oldItemId: string, newItem: AvailableItem) => void;
  onRemove: (itemId: string) => void;
  onClose: () => void;
}

export function ItemMenu({ itemId, itemName, unplacedItems, onReplace, onRemove, onClose }: ItemMenuProps) {
  const handleReplace = (newItem: AvailableItem) => {
    onReplace(itemId, newItem);
    onClose();
  };

  const handleRemove = () => {
    onRemove(itemId);
    onClose();
  };

  return (
    <Card className='absolute z-50 shadow-lg min-w-[200px]'>
      <CardHeader className='p-2 pb-2'>
        <div className='text-xs font-semibold'>{itemName}</div>
      </CardHeader>
      <CardContent className='p-2 pt-0'>
        <Separator className='mb-2' />
        <div className='mb-2 space-y-1'>
          <Label className='text-xs'>Replace with:</Label>
          <Select
            onValueChange={(value) => {
              const selectedItem = unplacedItems.find((item) => item.id === parseInt(value));
              if (selectedItem) {
                handleReplace(selectedItem);
              }
            }}
          >
            <SelectTrigger className='w-full text-xs h-7'>
              <SelectValue placeholder='Select item...' />
            </SelectTrigger>
            <SelectContent>
              {unplacedItems.map((item) => (
                <SelectItem key={item.id} value={item.id.toString()}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleRemove} variant='outline' size='sm' className='w-full text-xs h-7 bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800'>
          Remove
        </Button>
      </CardContent>
    </Card>
  );
}

