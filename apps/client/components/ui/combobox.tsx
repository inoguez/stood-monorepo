'use client';

import { Check, UserPlus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { User, friendRequests } from '../../../api/models/schema';
import Image from 'next/image';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { sendFriendRequest } from '@/app/actions/sendFriendRequest';
export function ComboboxDemo({
  searchQuery,
}: {
  searchQuery: (term: string) => Promise<User[]>;
}) {
  console.log();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState({ id: '', name: '', email: '' });
  const [items, setItems] = useState<User[]>([]);
  console.log(value);
  useEffect(() => {
    console.log('aa');
    if (!open) return setItems([]);
  }, [open]);
  useEffect(() => {
    if (!value.id) return;
    console.log('abba');
    setDrawerOpen(true);
  }, [value]);

  async function onChange(term: string) {
    console.log(term);
    if (!term) return setItems([]);
    const data = await searchQuery(term);
    console.log(data);
    setItems(data);
  }

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role='combobox'
            aria-expanded={open}
            className='w-fit justify-between'
          >
            <UserPlus />
            {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : 'aaa'} */}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-[200px] p-0'>
          <Command shouldFilter={false}>
            <CommandList>
              <CommandInput
                placeholder='Escribe un email'
                onValueChange={(term) => onChange(term)}
              />
              <CommandEmpty>Usuarios encontrados con ese email</CommandEmpty>

              <CommandGroup>
                {items?.map((user: User) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={(currentValue) => {
                      setValue({
                        id: currentValue,
                        name: user.name as string,
                        email: user.email as string,
                      });
                      setOpen(false);
                    }}
                  >
                    <div className='grid grid-cols-[auto_1fr] gap-2 items-center h-5'>
                      <Image
                        src={user?.picture as string}
                        width={20}
                        height={20}
                        alt='Profile Image'
                        className='rounded-full'
                      />
                      <span className='text-nowrap overflow-hidden overflow-ellipsis'>
                        {user.name}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Drawer
        open={drawerOpen}
        onOpenChange={(e) => {
          if (!e) setValue({ id: '', name: '', email: '' });
          setDrawerOpen(e);
        }}
      >
        <DrawerContent>
          <div className='mx-auto w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>Solicitud de amistad</DrawerTitle>
              <DrawerDescription>
                <span>
                  Deseas enviar una solicitud de amistad a <br />
                </span>
                <span className='font-black'>{value?.name}</span>
              </DrawerDescription>
            </DrawerHeader>

            <DrawerFooter>
              <form action={sendFriendRequest} className='w-full'>
                <input type='text' name='email' value={value.email} hidden />
                <Button type='submit' className='w-full'>
                  Enviar
                </Button>
              </form>
              <DrawerClose asChild>
                <Button variant='outline'>Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
