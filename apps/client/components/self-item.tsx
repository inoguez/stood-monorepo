'use client';
import { cn } from '@/lib/utils';
import { CircleUser } from 'lucide-react';
interface Props {
  className?: string;
}
export const SelfItem: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        'bg-neutral-700 rounded-full px-3 py-2 flex gap-2 items-center',
        className
      )}
    >
      <CircleUser />
      <span className='flex-1'>Ian Noguez Gomez</span>
    </div>
  );
};
