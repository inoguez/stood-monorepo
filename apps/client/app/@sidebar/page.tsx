import { AddFriend } from '@/components/AddFriend';
import { FriendItem } from '@/components/FriendItem';
import { SearchBar } from '@/components/SearchBar';
import { SelfItem } from '@/components/self-item';
import { StoodLogo } from '@/components/StoodLogo';
import { Notifications } from '@/components/notifications';
import { SettingsMenu } from '@/components/settings';
import { CircleUser } from 'lucide-react';
import { cookies } from 'next/headers';
import { getUser } from '../actions/getUser';

async function getNotifications() {
  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  //refactor this
  console.log('accessToken1', accessToken, 'refreshToken1', refreshToken);
  const token = accessToken;
  const res = await fetch(process.env.STOOD_API + `/notifications`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    credentials: 'include',
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
// async function getUser() {
//   const accessToken = cookies().get('accessToken')?.value;
//   const refreshToken = cookies().get('refreshToken')?.value;

//   //refactor this
//   console.log('accessToken1', accessToken, 'refreshToken1', refreshToken);
//   const token = accessToken;
//   console.log(process.env.STOOD_API);
//   const res = await fetch(process.env.STOOD_API + `/friendRequest/send`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `${token}`,
//     },
//     credentials: 'include',
//   });
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   const respo = await res.json();
//   console.log(respo);
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return res.json();
// }
export default async function UsersPage() {
  const notifications = await getNotifications();
  const user = await getUser();
  console.log(user);
  const FRIENDS = [
    {
      id: '1',
      full_name: 'John Doe',
      photo: 'john_doe.jpg',
    },
  ];
  return (
    <div className='flex flex-col gap-4 w-72'>
      <StoodLogo />
      <div className='flex gap-2'>
        <SearchBar />
        <AddFriend />
        <Notifications notifications={notifications} />
      </div>
      <div className=' bg-neutral-700 rounded-3xl  flex-1 flex flex-col gap-2 overflow-hidden '>
        <div className='relative  h-full'>
          <div className='absolute top-0 left-0 bottom-0 right-0 overflow-hidden hover:overflow-y-auto flex flex-col gap-3 p-3 w-full scroll-issue'>
            {FRIENDS?.map((e) => (
              <FriendItem key={e.id}>
                <CircleUser />
                {e.full_name}
              </FriendItem>
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-2'>
        <SelfItem user={user} className='grow' />
        <SettingsMenu />
      </div>
    </div>
  );
}
