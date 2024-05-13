'use server';
import HttpUtil from '../utils/fetchAPI';
export async function getUser() {
  try {
    const data = await HttpUtil.get('/users/authenticated', 'users');
    return data;
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}
