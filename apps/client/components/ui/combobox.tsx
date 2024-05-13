'use client';

import { Bell, Plus, UserPlus } from 'lucide-react';

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
import { useEffect, useRef, useState } from 'react';
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
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
export function ComboboxDemo({
  searchQuery,
}: {
  searchQuery: (term: string) => Promise<any[]>;
}) {
  console.log();
  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState({ id: '', name: '', email: '' });
  const [items, setItems] = useState<any[]>([]);
  const formRef = useRef(null);

  const { pending } = useFormStatus();

  useEffect(() => {
    if (!open) return setItems([]);
  }, [open]);
  useEffect(() => {
    if (!value.id) return;
    setDrawerOpen(true);
  }, [value]);

  async function onChange(term: string) {
    console.log(term);
    if (!term) return setItems([]);
    const data = await searchQuery(term);
    setItems(data);
  }
  async function sendRequest(formData: FormData) {
    const data = await sendFriendRequest(formData);
    setDrawerOpen(false);
    toast('Notificacion', {
      description: data?.error ? data?.error : data.message,
      duration: 5000,
      icon: <Bell />,
    });
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
        <PopoverContent align='start' className='w-auto p-0'>
          <Command shouldFilter={false}>
            <CommandList>
              <CommandInput
                placeholder='Escribe un email'
                onValueChange={(term) => onChange(term)}
              />
              <CommandEmpty className='px-4 text-center'>
                Usuarios no encontrados
              </CommandEmpty>

              <CommandGroup>
                {items?.map((user: any) => (
                  <CommandItem
                    className=''
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
                    <div
                      key={user?.id}
                      className='grid grid-cols-[auto_auto_1fr] gap-2 items-center h-auto text-neutral-600'
                    >
                      <Plus />
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
              <form ref={formRef} action={sendRequest} className='w-full'>
                <input
                  type='text'
                  name='email'
                  defaultValue={value.email}
                  hidden
                />
                <Button
                  variant={'alternative'}
                  type='submit'
                  className='w-full'
                  disabled={pending}
                >
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
