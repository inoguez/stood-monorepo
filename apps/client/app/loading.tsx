import { Skeleton } from '@/components/ui/skeleton';

export default function SideBarLoading() {
  return (
    <>
      <div className='flex flex-col gap-4 w-72'>
        <div className='h-14'></div>
        <Skeleton className='h-10  rounded-3xl' />
        <Skeleton className='h-10  rounded-3xl' />
        <Skeleton className='flex-1  rounded-3xl' />
        <Skeleton className='h-10  rounded-3xl' />
      </div>
      <div className='flex flex-col grow'>
        <Skeleton className='h-full rounded-3xl' />
      </div>
    </>
  );
}
