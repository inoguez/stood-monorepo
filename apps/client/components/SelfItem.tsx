import { CircleUser, Settings } from 'lucide-react';

export const SelfItem = () => {
  return (
    <div className='bg-neutral-700 rounded-full px-3 py-2 flex gap-2'>
      <CircleUser />
      <span className='flex-1'>Ian Noguez Gomez</span>
      <button>
        <Settings />
      </button>
    </div>
  );
};
