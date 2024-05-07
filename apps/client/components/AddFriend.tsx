'use server';
import { ComboboxDemo } from './ui/combobox';
import { searchQuery } from '@/app/actions/searchQuery';

export const AddFriend = () => {
  return <ComboboxDemo searchQuery={searchQuery} />;
};
