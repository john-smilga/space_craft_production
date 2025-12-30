'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { usePlanogramQuery, useLayoutQuery } from '../../queries';
import { generatePlanogramCSV, downloadCSV } from '../../utils/generate-csv';

type DownloadButtonProps = {
  planogramSlug: string;
  planogramName: string;
};

export function DownloadButton({ planogramSlug, planogramName }: DownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: planogram } = usePlanogramQuery(planogramSlug);
  const { data: layout } = useLayoutQuery(planogramSlug);

  const handleDownload = () => {
    try {
      setIsGenerating(true);

      if (!planogram) {
        toast.error('Planogram data not available');
        return;
      }

      const csvContent = generatePlanogramCSV(planogram, layout || null);

      if (csvContent === 'No planogram data available') {
        toast.error('Unable to generate CSV: No planogram data');
        return;
      }

      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      const filename = `${planogramName}-${dateStr}.csv`;

      downloadCSV(csvContent, filename);
      toast.success('CSV downloaded successfully');
    } catch (error) {
      console.error('Error generating CSV:', error);
      toast.error('Failed to download CSV');
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || !planogram;

  return (
    <Button
      variant='outline'
      size='sm'
      onClick={handleDownload}
      disabled={isDisabled}
      className='border-blue-600 text-blue-600 hover:bg-blue-50'
    >
      <Download className='h-4 w-4 mr-2' />
      {isGenerating ? 'Preparing...' : 'Download'}
    </Button>
  );
}
