import { FriendItem } from '@/components/FriendItem';
import { CircleUser } from 'lucide-react';

export default function UsersPage() {
  const FRIENDS = [
    {
      id: '1',
      full_name: 'John Doe',
      photo: 'john_doe.jpg',
    },
    {
      id: '2',
      full_name: 'Jane Smith',
      photo: 'jane_smith.jpg',
    },
    {
      id: '3',
      full_name: 'Michael Johnson',
      photo: 'michael_johnson.jpg',
    },
    {
      id: '4',
      full_name: 'Emily Davis',
      photo: 'emily_davis.jpg',
    },
    {
      id: '5',
      full_name: 'David Wilson',
      photo: 'david_wilson.jpg',
    },
    {
      id: '6',
      full_name: 'Sarah Anderson',
      photo: 'sarah_anderson.jpg',
    },
    {
      id: '7',
      full_name: 'Robert Martinez',
      photo: 'robert_martinez.jpg',
    },
    {
      id: '8',
      full_name: 'Jennifer Taylor',
      photo: 'jennifer_taylor.jpg',
    },
    {
      id: '9',
      full_name: 'William Thomas',
      photo: 'william_thomas.jpg',
    },
    {
      id: '10',
      full_name: 'Jessica Hernandez',
      photo: 'jessica_hernandez.jpg',
    },
    {
      id: '11',
      full_name: 'Daniel Moore',
      photo: 'daniel_moore.jpg',
    },
    {
      id: '12',
      full_name: 'Lauren Clark',
      photo: 'lauren_clark.jpg',
    },
    {
      id: '13',
      full_name: 'Anthony Rodriguez',
      photo: 'anthony_rodriguez.jpg',
    },
    {
      id: '14',
      full_name: 'Megan Lewis',
      photo: 'megan_lewis.jpg',
    },
    {
      id: '15',
      full_name: 'Christopher Lee',
      photo: 'christopher_lee.jpg',
    },
    {
      id: '16',
      full_name: 'Ashley Walker',
      photo: 'ashley_walker.jpg',
    },
    {
      id: '17',
      full_name: 'Matthew Hall',
      photo: 'matthew_hall.jpg',
    },
    {
      id: '18',
      full_name: 'Amanda Green',
      photo: 'amanda_green.jpg',
    },
    {
      id: '19',
      full_name: 'Andrew King',
      photo: 'andrew_king.jpg',
    },
    {
      id: '20',
      full_name: 'Stephanie Hill',
      photo: 'stephanie_hill.jpg',
    },
    {
      id: '21',
      full_name: 'Jason Adams',
      photo: 'jason_adams.jpg',
    },
    {
      id: '22',
      full_name: 'Melissa Nelson',
      photo: 'melissa_nelson.jpg',
    },
    {
      id: '23',
      full_name: 'Kevin Turner',
      photo: 'kevin_turner.jpg',
    },
    {
      id: '24',
      full_name: 'Rachel Scott',
      photo: 'rachel_scott.jpg',
    },
    {
      id: '25',
      full_name: 'Eric Cooper',
      photo: 'eric_cooper.jpg',
    },
    {
      id: '26',
      full_name: 'Nicole Carter',
      photo: 'nicole_carter.jpg',
    },
    {
      id: '27',
      full_name: 'Timothy Rivera',
      photo: 'timothy_rivera.jpg',
    },
    {
      id: '28',
      full_name: 'Samantha Ward',
      photo: 'samantha_ward.jpg',
    },
    {
      id: '29',
      full_name: 'Jason Adams',
      photo: 'jason_adams.jpg',
    },
    {
      id: '30',
      full_name: 'Melissa Nelson',
      photo: 'melissa_nelson.jpg',
    },
    {
      id: '31',
      full_name: 'Kevin Turner',
      photo: 'kevin_turner.jpg',
    },
    {
      id: '32',
      full_name: 'Rachel Scott',
      photo: 'rachel_scott.jpg',
    },
    {
      id: '33',
      full_name: 'Eric Cooper',
      photo: 'eric_cooper.jpg',
    },
    {
      id: '34',
      full_name: 'Nicole Carter',
      photo: 'nicole_carter.jpg',
    },
    {
      id: '35',
      full_name: 'Timothy Rivera',
      photo: 'timothy_rivera.jpg',
    },
  ];
  return (
    <div className='relative  h-full'>
      <div className='absolute top-0 left-0 bottom-0 right-0 overflow-hidden hover:overflow-y-auto flex flex-col gap-3 px-[0.4rem] py-4 w-full scroll-issue'>
        {FRIENDS?.map((e) => (
          <FriendItem key={e.id}>
            <CircleUser />
            {e.full_name}
          </FriendItem>
        ))}
      </div>
    </div>
  );
}
