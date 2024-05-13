'use client';
import { cn } from '@/lib/utils';
import { CircleUser } from 'lucide-react';
import { SelectUser } from '@stood/database';
import Image from 'next/image';

interface Props {
  className?: string;
  user: SelectUser;
}
export const SelfItem: React.FC<Props> = ({ className, user }) => {
  console.log(user);
  return (
    <div
      className={cn(
        'bg-neutral-700 rounded-full px-3 py-2 flex gap-2 items-center',
        className
      )}
    >
      <Image
        src={user?.picture as string}
        width={24}
        height={24}
        alt='Profile Image'
        className='rounded-full'
      />
      <span className='flex-1'>{user?.name}</span>
    </div>
  );
};
