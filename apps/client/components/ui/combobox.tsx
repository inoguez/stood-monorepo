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
import { User } from '../../../api/models/schema';

export function ComboboxDemo({
  searchQuery,
}: {
  searchQuery: (term: string) => Promise<User[]>;
}) {
  console.log();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState<User[]>([]);
  console.log(items);
  useEffect(() => {
    setItems([]);
  }, [open]);
  async function onChange(term: string) {
    console.log(term);
    if (!term) return setItems([]);
    const data = await searchQuery(term);
    setItems(data);
  }
  return (
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
      <PopoverContent className='w-[200px] p-0'>
        <Command shouldFilter={false}>
          <CommandList>
            <CommandInput
              placeholder='Escribe un email'
              onValueChange={(term) => onChange(term)}
            />
            <CommandEmpty>Usuarios encontrados con ese email</CommandEmpty>

            <CommandGroup>
              {items.map((user: User) => (
                <CommandItem
                  key={user.id}
                  value={user.id}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === user.email ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {user.email}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
