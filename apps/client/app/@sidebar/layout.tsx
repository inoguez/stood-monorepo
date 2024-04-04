import { AddFriend } from '@/components/AddFriend';
import { SearchBar } from '@/components/SearchBar';
import { SelfItem } from '@/components/SelfItem';
import { StoodLogo } from '@/components/StoodLogo';

export default function SideBarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col gap-4 w-72'>
      <StoodLogo />
      <div className='flex gap-4'>
        <SearchBar />
        <AddFriend />
      </div>
      <div className=' bg-neutral-700 rounded-2xl flex-1 flex flex-col gap-2 overflow-hidden'>
        {children}
      </div>
      <SelfItem />
    </div>
  );
}
