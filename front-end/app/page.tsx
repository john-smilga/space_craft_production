import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function Home() {
  // Note: Authenticated users are redirected to /dashboard via proxy.ts (server-side)
  // This page only renders for unauthenticated users
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
      <div className='max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center'>
        <div className='text-center md:text-left'>
          <h1 className='text-5xl md:text-6xl font-bold mb-4'>SpaceCraft</h1>
          <p className='text-xl text-muted-foreground mb-8'>Plan your perfect store layout. Optimize shelf space with intelligent planning.</p>
          <Button asChild size='lg' className='text-lg'>
            <Link href='/login'>Get Started</Link>
          </Button>
        </div>
        <div className='flex justify-center md:justify-end'>
          <Image src='/undraw_groceries_4via.svg' alt='Grocery shopping illustration' width={500} height={500} className='w-full max-w-md' priority />
        </div>
      </div>
    </div>
  );
}
