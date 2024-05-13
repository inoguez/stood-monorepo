'use client';
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
import {
  SelectFriendRequest,
  SelectNotification,
  SelectUser,
} from '@stood/database';
import { respondToFriendRequest } from '@/app/actions/respondToFriendRequest';
import { getNotifications } from '@/app/actions/getNotifications';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import pusher from '@/app/utils/pusher';
import { revalidateNotifications } from '@/app/actions/getNotifications';

interface Notifications {
  notifications: SelectNotification;
  friendRequests: SelectFriendRequest;
}
export const Notifications = async ({
  user,
  notificationList,
  respondRequest,
}: {
  user: SelectUser;
  notificationList: any;
  respondRequest: any;
}) => {
  useEffect(() => {
    console.log(user);
    if (!user?.id) return;
    // Configurar Pusher con tus credenciales
    console.log(user);
    console.log(process.env.NEXT_PUBLIC_PUSHER_KEY);

    // Suscribir al canal deseado
    const channel = pusher.subscribe(`user-${user?.id}`);

    // Manejar eventos del canal
    channel.bind('notification', (data: any) => {
      console.log('Evento recibido:', data);
      toast('Solicitud de amistad', {
        description: data?.message,
        duration: 5000,
        icon: <Bell />,
      });
      revalidateNotifications();
      // Agregar lógica para manejar el evento
    });

    // Limpiar al desmontar el componente
    return () => {
      channel.unbind(); // Desvincular todos los eventos del canal
      pusher.unsubscribe(`user-${user.id}`); // Desuscribir del canal
    };
  }, [user]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='bg-neutral-700 aspect-square rounded-full px-2 hover:bg-neutral-400 hover:text-neutral-800'>
        <Bell />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='start'>
        <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notificationList.length === 0 && (
          <div className=' grid place-content-center h-full p-4'>
            <span>Sin notificaciones </span>
          </div>
        )}
        {notificationList?.map((item: Notifications, index: any) => {
          return (
            <div
              className='px-2 text-sm flex gap-3 items-center rounded-2xl'
              key={item?.notifications?.id}
            >
              <span>{item?.notifications?.message}</span>
              {item?.friendRequests?.status === 'SENDED' && (
                <>
                  <form action={respondToFriendRequest}>
                    <input
                      hidden
                      type='text'
                      name='requestId'
                      defaultValue={item?.friendRequests?.id}
                    />
                    <input
                      hidden
                      type='text'
                      name='action'
                      defaultValue={'ACCEPTED'}
                    />
                    <Button type='submit' size={'sm'} variant={'secondary'}>
                      <Check className='text-xs' />
                    </Button>
                  </form>

                  <Button size={'sm'} variant={'destructive'}>
                    <Ban className='text-xs' />
                  </Button>
                </>
              )}
              {item?.friendRequests?.status === 'ACCEPTED' && (
                <span>Aceptada</span>
              )}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
//async () => {
//   const formData = new FormData();
//   formData.append('requestId', e.friendRequestsId.id);
// }
