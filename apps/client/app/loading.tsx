import { Skeleton } from '@/components/ui/skeleton';

export default function SideBarLoading() {
  return (
    <>
      <Skeleton className='h-full w-72' />
      <Skeleton className='h-full grow' />
    </>
  );
}
