'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { FormSelectField } from '@/components/ui/form-select-field';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useCreateDisplayMutation, useDisplayTypesQuery, useStandardDisplaysQuery } from '../../queries';

export function DisplayForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [widthIn, setWidthIn] = useState('60');
  const [heightIn, setHeightIn] = useState('48');
  const [depthIn, setDepthIn] = useState('24');
  const [shelfCount, setShelfCount] = useState('4');
  const [shelfSpacing, setShelfSpacing] = useState('');
  const [selectedStandard, setSelectedStandard] = useState('');

  const { data: typesData } = useDisplayTypesQuery();
  const displayTypes = typesData?.types || [];

  const { data: standardsData } = useStandardDisplaysQuery();
  const standards = useMemo(() => standardsData?.standards || [], [standardsData]);

  const createMutation = useCreateDisplayMutation();

  useEffect(() => {
    if (!selectedStandard) {
      return;
    }
    
    const standard = standards.find((s: { id: number; [key: string]: unknown }) => s.id.toString() === selectedStandard);
    if (!standard) {
      return;
    }

    Promise.resolve().then(() => {
      setName(standard.name);
      setType(standard.type);
      setWidthIn(standard.width_in.toString());
      setHeightIn(standard.height_in.toString());
      setDepthIn(standard.depth_in?.toString() || '24');
      setShelfCount(standard.shelf_count.toString());
      setShelfSpacing(standard.shelf_spacing?.toString() || '');
    });
  }, [selectedStandard, standards]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await createMutation.mutateAsync({
        name,
        type: type as "gondola" | "endcap" | "wall_unit" | "refrigerated_case" | "freezer_case" | "island_display" | "checkout_counter" | "shelf" | "rack" | "bin" | "other",
        width_in: widthIn,
        height_in: heightIn,
        depth_in: depthIn,
        shelf_count: parseInt(shelfCount),
        shelf_spacing: shelfSpacing || null,
      });

      router.push(`/dashboard/displays/${result.slug}`);
    } catch {
      // Error handled by mutation
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
                  label: `${standard.name} (${standard.type}) - ${standard.width_in}" × ${standard.height_in}" × ${standard.depth_in || 24}"`,
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
              <p className='text-xs text-muted-foreground mt-1'>Tip: Include width in the name (e.g., &quot;5-Foot Gondola&quot;) to help identify the display</p>
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

            {createMutation.isError && (
              <Alert variant='destructive'>
                <AlertDescription>{createMutation.error?.message || 'Failed to create display'}</AlertDescription>
              </Alert>
            )}

            <div className='flex gap-2 pt-4'>
              <Button type='submit' disabled={createMutation.isPending}>
                {createMutation.isPending ? 'Creating...' : 'Create Display'}
              </Button>
              <Button type='button' onClick={() => router.push('/dashboard/displays')} disabled={createMutation.isPending} variant='outline'>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

