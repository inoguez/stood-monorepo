import Link from 'next/link';

export const FriendItem = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Link
      href={''}
      className='px-3 py-2 bg-neutral-600 rounded-full flex gap-2 hover:bg-neutral-400 hover:text-neutral-700 transition-colors ease-in-out duration-150'
    >
      {children}
    </Link>
  );
};
