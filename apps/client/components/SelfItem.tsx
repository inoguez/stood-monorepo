import { CircleUser, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';

export const SelfItem = () => {
  async function logout() {
    'use server';

    redirect(process.env.STOOD_API + '/oauth/logout', 'replace');
  }
  return (
    <div className='bg-neutral-700 rounded-full px-3 py-2 flex gap-2'>
      <CircleUser />
      <span className='flex-1'>Ian Noguez Gomez</span>
      <form action={logout}>
        <button type='submit'>
          <Settings />
        </button>
      </form>
    </div>
  );
};
