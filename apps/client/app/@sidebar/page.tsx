import { AddFriend } from '@/components/AddFriend';
import { FriendItem } from '@/components/FriendItem';
import { SearchBar } from '@/components/SearchBar';
import { SelfItem } from '@/components/self-item';
import { StoodLogo } from '@/components/StoodLogo';
import { Notifications } from '@/components/notifications';
import { SettingsMenu } from '@/components/settings';
import { CircleUser } from 'lucide-react';
import { cookies } from 'next/headers';

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

export default async function UsersPage() {
  const notifications = await getNotifications();
  console.log(notifications);
  const FRIENDS = [
    {
      id: '1',
      full_name: 'John Doe',
      photo: 'john_doe.jpg',
    },
    // {
    //   id: '2',
    //   full_name: 'Jane Smith',
    //   photo: 'jane_smith.jpg',
    // },
    // {
    //   id: '3',
    //   full_name: 'Michael Johnson',
    //   photo: 'michael_johnson.jpg',
    // },
    // {
    //   id: '4',
    //   full_name: 'Emily Davis',
    //   photo: 'emily_davis.jpg',
    // },
    // {
    //   id: '5',
    //   full_name: 'David Wilson',
    //   photo: 'david_wilson.jpg',
    // },
    // {
    //   id: '6',
    //   full_name: 'Sarah Anderson',
    //   photo: 'sarah_anderson.jpg',
    // },
    // {
    //   id: '7',
    //   full_name: 'Robert Martinez',
    //   photo: 'robert_martinez.jpg',
    // },
    // {
    //   id: '8',
    //   full_name: 'Jennifer Taylor',
    //   photo: 'jennifer_taylor.jpg',
    // },
    // {
    //   id: '9',
    //   full_name: 'William Thomas',
    //   photo: 'william_thomas.jpg',
    // },
    // {
    //   id: '10',
    //   full_name: 'Jessica Hernandez',
    //   photo: 'jessica_hernandez.jpg',
    // },
    // {
    //   id: '11',
    //   full_name: 'Daniel Moore',
    //   photo: 'daniel_moore.jpg',
    // },
    // {
    //   id: '12',
    //   full_name: 'Lauren Clark',
    //   photo: 'lauren_clark.jpg',
    // },
    // {
    //   id: '13',
    //   full_name: 'Anthony Rodriguez',
    //   photo: 'anthony_rodriguez.jpg',
    // },
    // {
    //   id: '14',
    //   full_name: 'Megan Lewis',
    //   photo: 'megan_lewis.jpg',
    // },
    // {
    //   id: '15',
    //   full_name: 'Christopher Lee',
    //   photo: 'christopher_lee.jpg',
    // },
    // {
    //   id: '16',
    //   full_name: 'Ashley Walker',
    //   photo: 'ashley_walker.jpg',
    // },
    // {
    //   id: '17',
    //   full_name: 'Matthew Hall',
    //   photo: 'matthew_hall.jpg',
    // },
    // {
    //   id: '18',
    //   full_name: 'Amanda Green',
    //   photo: 'amanda_green.jpg',
    // },
    // {
    //   id: '19',
    //   full_name: 'Andrew King',
    //   photo: 'andrew_king.jpg',
    // },
    // {
    //   id: '20',
    //   full_name: 'Stephanie Hill',
    //   photo: 'stephanie_hill.jpg',
    // },
    // {
    //   id: '21',
    //   full_name: 'Jason Adams',
    //   photo: 'jason_adams.jpg',
    // },
    // {
    //   id: '22',
    //   full_name: 'Melissa Nelson',
    //   photo: 'melissa_nelson.jpg',
    // },
    // {
    //   id: '23',
    //   full_name: 'Kevin Turner',
    //   photo: 'kevin_turner.jpg',
    // },
    // {
    //   id: '24',
    //   full_name: 'Rachel Scott',
    //   photo: 'rachel_scott.jpg',
    // },
    // {
    //   id: '25',
    //   full_name: 'Eric Cooper',
    //   photo: 'eric_cooper.jpg',
    // },
    // {
    //   id: '26',
    //   full_name: 'Nicole Carter',
    //   photo: 'nicole_carter.jpg',
    // },
    // {
    //   id: '27',
    //   full_name: 'Timothy Rivera',
    //   photo: 'timothy_rivera.jpg',
    // },
    // {
    //   id: '28',
    //   full_name: 'Samantha Ward',
    //   photo: 'samantha_ward.jpg',
    // },
    // {
    //   id: '29',
    //   full_name: 'Jason Adams',
    //   photo: 'jason_adams.jpg',
    // },
    // {
    //   id: '30',
    //   full_name: 'Melissa Nelson',
    //   photo: 'melissa_nelson.jpg',
    // },
    // {
    //   id: '31',
    //   full_name: 'Kevin Turner',
    //   photo: 'kevin_turner.jpg',
    // },
    // {
    //   id: '32',
    //   full_name: 'Rachel Scott',
    //   photo: 'rachel_scott.jpg',
    // },
    // {
    //   id: '33',
    //   full_name: 'Eric Cooper',
    //   photo: 'eric_cooper.jpg',
    // },
    // {
    //   id: '34',
    //   full_name: 'Nicole Carter',
    //   photo: 'nicole_carter.jpg',
    // },
    // {
    //   id: '35',
    //   full_name: 'Timothy Rivera',
    //   photo: 'timothy_rivera.jpg',
    // },
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
        <SelfItem className='grow' />
        <SettingsMenu />
      </div>
    </div>
  );
}
