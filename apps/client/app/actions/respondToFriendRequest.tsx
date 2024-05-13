'use server';
import { revalidateTag } from 'next/cache';
import HttpUtil from '../utils/fetchAPI';
import { revalidateNotifications } from './getNotifications';

export async function respondToFriendRequest(formData: FormData) {
  try {
    const data = await HttpUtil.post(`/friendRequest/respond`, {
      requestId: formData.get('requestId'),
      action: formData.get('action'),
    });

    revalidateNotifications();

    return data;
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}
