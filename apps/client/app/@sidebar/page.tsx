import { AddFriend } from '@/components/AddFriend';
import { FriendItem } from '@/components/FriendItem';
import { SearchBar } from '@/components/SearchBar';
import { SelfItem } from '@/components/self-item';
import { StoodLogo } from '@/components/StoodLogo';
import { Notifications } from '@/components/notifications';
import { SettingsMenu } from '@/components/settings';
import { Bell, CircleUser } from 'lucide-react';
import { getUser } from '../actions/getUser';
import { getNotifications } from '../actions/getNotifications';
import { respondToFriendRequest } from '../actions/respondToFriendRequest';
import { toast } from 'sonner';
import { getFriends } from '../actions/getFriends';
import { SelectUser } from '@stood/database';
import Image from 'next/image';

export default async function UsersPage() {
  const user = await getUser();
  const notificationList = await getNotifications();
  const friends = await getFriends();
  console.log(user);
  console.log(friends);
  async function respondRequest(formData: FormData) {
    'use server';
    const data = await respondToFriendRequest(formData);
    console.log(data);
    toast('Notificación', {
      description: data?.error ? data?.error : data.message,
      duration: 5000,
      icon: <Bell />,
    });
  }
  console.log(user);

  return (
    <div className='flex flex-col gap-4 w-72'>
      <StoodLogo />
      <div className='flex gap-2'>
        <SearchBar />
        <AddFriend />
        <Notifications
          user={user}
          notificationList={notificationList}
          respondRequest={respondRequest}
        />
      </div>
      <div className=' bg-neutral-700 rounded-3xl  flex-1 flex flex-col gap-2 overflow-hidden '>
        <div className='relative  h-full'>
          <div className='absolute top-0 left-0 bottom-0 right-0 overflow-hidden hover:overflow-y-auto flex flex-col gap-3 p-3 w-full scroll-issue'>
            {friends?.map((e: SelectUser) => (
              <FriendItem key={e.id}>
                <Image
                  src={e?.picture as string}
                  width={24}
                  height={24}
                  alt={e?.name + ' profile image'}
                  className='rounded-full aspect-square'
                />
                {e?.name}
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
