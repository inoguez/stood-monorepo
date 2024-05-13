'use server';
import HttpUtil from '../utils/fetchAPI';
import { revalidatePath } from 'next/cache';

export async function getNotifications() {
  try {
    const data = await HttpUtil.get('/notifications', 'notifications');
    return data;
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}

export async function revalidateNotifications() {
  revalidatePath('notifications');
}
