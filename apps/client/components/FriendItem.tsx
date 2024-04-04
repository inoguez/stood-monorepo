export const FriendItem = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='px-3 py-2 bg-neutral-600 rounded-full flex gap-2'>
      {children}
    </div>
  );
};
