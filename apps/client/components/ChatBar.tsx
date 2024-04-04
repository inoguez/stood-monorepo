import { cn } from '@/lib/utils';
import { SendHorizontal } from 'lucide-react';

export default function ChatBar() {
  return (
    <form className='max-w-xl mx-auto relative'>
      <textarea className='resize-none p-2 rounded-2xl bg-neutral-800  h-12 w-full'></textarea>
      <button className='absolute bottom-[1rem] right-2'>
        <SendHorizontal />
      </button>
    </form>
  );
}
