'use server';

import HttpUtil from '../utils/fetchAPI';

export async function searchQuery(term: string) {
  try {
    const data = await HttpUtil.get(`/users/search?searchTerm=${term}`);
    return data;
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
  }
}
