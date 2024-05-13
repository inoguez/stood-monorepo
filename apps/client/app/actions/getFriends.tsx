'use server';
import HttpUtil from '../utils/fetchAPI';
import { revalidatePath } from 'next/cache';

export async function getFriends() {
  try {
    const data = await HttpUtil.get('/friends', 'friends');
    return data;
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}

export async function revalidateFriends() {
  revalidatePath('friends');
}
