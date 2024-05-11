import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Ban, Bell, Check } from 'lucide-react';
import { Button } from './ui/button';

export const Notifications = ({ notifications = [] }) => {
  console.log(notifications);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-neutral-700 aspect-square rounded-full px-2 hover:bg-neutral-400 hover:text-neutral-800'>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications?.map((e: any) => (
          <div className='px-2 text-sm flex gap-3 items-center' key={e?.id}>
            <span>{e?.message}</span>
            <Button size={'sm'} variant={'secondary'}>
              <Check className='text-xs' />
            </Button>
            <Button size={'sm'} variant={'destructive'}>
              <Ban className='text-xs' />
            </Button>
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
