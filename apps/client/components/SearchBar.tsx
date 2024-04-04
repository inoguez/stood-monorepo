import { Search } from 'lucide-react';

export const SearchBar = () => {
  return (
    <div className='bg-neutral-700 rounded-2xl flex-1 px-2 py-1 flex gap-2'>
      <Search />
      <input type='text ' size={5} className='[all:unset] shrink-0' />
    </div>
  );
};
