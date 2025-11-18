'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { ReactNode } from 'react';

interface InfoAlertProps {
  children: ReactNode;
  className?: string;
}

export default function InfoAlert({ children, className = 'mb-6' }: InfoAlertProps) {
  return (
    <Alert className={className}>
      <AlertDescription className='flex items-center gap-2'>
        <span>💡</span>
        <span>{children}</span>
      </AlertDescription>
    </Alert>
  );
}

