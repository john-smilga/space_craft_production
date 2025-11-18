'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@/hooks/useMutation';
import { useFetch } from '@/hooks/useFetch';
import api from '@/lib/axios';
import type { DisplayResponse } from '@/types/displays';
import type { DisplayTypesResponse, StandardDisplaysResponse } from '@/types/displays';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CreateDisplayVariables {
  name: string;
  type: string;
  width_in: number;
  height_in: number;
  depth_in?: number | null;
  shelf_count: number;
  shelf_spacing?: number | null;
}

export default function CreateDisplayPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [widthIn, setWidthIn] = useState('60'); // Default: 5 feet (60 inches)
  const [heightIn, setHeightIn] = useState('48'); // Default: 48 inches
  const [depthIn, setDepthIn] = useState('24'); // Default: 24 inches (2 feet)
  const [shelfCount, setShelfCount] = useState('4'); // Default: 4 shelves
  const [shelfSpacing, setShelfSpacing] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');

  const { data: typesData } = useFetch<DisplayTypesResponse>('/displays/types/');
  const displayTypes = typesData?.types || [];

  const { data: standardsData } = useFetch<StandardDisplaysResponse>('/displays/standards/');
  const standards = standardsData?.standards || [];

  // Handle standard selection
  useEffect(() => {
    if (selectedStandard) {
      const standard = standards.find((s) => s.id.toString() === selectedStandard);
      if (standard) {
        setName(standard.name);
        setType(standard.type);
        setWidthIn(standard.width_in.toString());
        setHeightIn(standard.height_in.toString());
        setDepthIn(standard.depth_in?.toString() || '24');
        setShelfCount(standard.shelf_count.toString());
        setShelfSpacing(standard.shelf_spacing?.toString() || '');
      }
    }
  }, [selectedStandard, standards]);

  const createDisplayMutation = useMutation<DisplayResponse, CreateDisplayVariables>(
    async (variables) => {
      const response = await api.post('/displays/', variables);
      return {
        display: response.data.display,
      };
    },
    { toastResource: 'display' }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    createDisplayMutation.reset();

    const result = await createDisplayMutation.mutate({
      name,
      type,
      width_in: parseFloat(widthIn),
      height_in: parseFloat(heightIn),
      depth_in: parseFloat(depthIn),
      shelf_count: parseInt(shelfCount),
      shelf_spacing: shelfSpacing ? parseFloat(shelfSpacing) : null,
    });

    if (result.data) {
      router.push(`/dashboard/displays/${result.data.display.slug}`);
    }
  };

  return (
    <>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold mb-2'>Create Display</h1>
        <p className='text-muted-foreground'>Add a new display type to your catalog</p>
      </div>

      <Card className='max-w-2xl'>
        <CardHeader>
          <CardTitle>Display Information</CardTitle>
          <CardDescription>Enter the details for the new display</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <FormSelectField
                label='Start from Standard Template (Optional)'
                id='standard'
                value={selectedStandard}
                onValueChange={setSelectedStandard}
                options={standards.map((standard) => ({
                  label: `${standard.name} (${standard.type_display}) - ${standard.width_in}" × ${standard.height_in}" × ${standard.depth_in || 24}"`,
                  value: standard.id.toString(),
                }))}
                placeholder='None'
              />
              <p className='text-xs text-muted-foreground mt-1'>Select a standard template to pre-fill all fields, then customize as needed</p>
            </div>

            <div>
              <FormField
                label='Display Name *'
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder='e.g., 5-Foot Gondola'
              />
              <p className='text-xs text-muted-foreground mt-1'>Tip: Include width in the name (e.g., "5-Foot Gondola") to help identify the display</p>
            </div>

            <FormSelectField
              label='Type *'
              id='type'
              value={type}
              onValueChange={setType}
              options={displayTypes.map((typeOption) => ({
                label: typeOption.label,
                value: typeOption.value,
              }))}
              placeholder='Select a type'
            />

            <div className='grid grid-cols-2 gap-4'>
              <FormField
                label='Width (inches) *'
                id='width'
                type='number'
                step='1'
                value={widthIn}
                onChange={(e) => setWidthIn(e.target.value)}
                required
                placeholder='e.g., 48'
              />

              <FormField
                label='Height (inches) *'
                id='height'
                type='number'
                step='1'
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
                required
                placeholder='e.g., 72'
              />
            </div>

            <div className='grid grid-cols-3 gap-4'>
              <FormField
                label='Shelf Count *'
                id='shelfCount'
                type='number'
                value={shelfCount}
                onChange={(e) => setShelfCount(e.target.value)}
                required
                placeholder='e.g., 4'
              />

              <FormField
                label='Depth (inches) *'
                id='depth'
                type='number'
                step='1'
                value={depthIn}
                onChange={(e) => setDepthIn(e.target.value)}
                required
                placeholder='e.g., 24'
              />

              <FormField
                label='Shelf Spacing (inches)'
                id='shelfSpacing'
                type='number'
                step='1'
                value={shelfSpacing}
                onChange={(e) => setShelfSpacing(e.target.value)}
                placeholder='e.g., 12'
              />
            </div>

            {createDisplayMutation.error && (
              <Alert variant='destructive'>
                <AlertDescription>{createDisplayMutation.error}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={createDisplayMutation.loading}>
                {createDisplayMutation.loading ? 'Creating...' : 'Create Display'}
              </Button>
              <Button type='button' onClick={() => router.push('/dashboard/displays')} disabled={createDisplayMutation.loading} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
