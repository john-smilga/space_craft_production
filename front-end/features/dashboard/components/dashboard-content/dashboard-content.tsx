'use client';

import Link from 'next/link';
import { DashboardHeader } from '../dashboard-header/dashboard-header';
import { navigationItems } from '@/lib/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function DashboardContent() {
  return (
    <>
      <DashboardHeader />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {navigationItems.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.href} href={card.href} className='block'>
              <Card className='p-8 hover:border-primary hover:shadow-md transition-all'>
                <CardHeader className='pb-3'>
                  <div className='flex items-center gap-4'>
                    <Icon className='w-12 h-12 text-primary' />
                    <CardTitle className='text-2xl'>{card.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className='pt-0'>
                  <CardDescription className='text-base'>{card.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
}

