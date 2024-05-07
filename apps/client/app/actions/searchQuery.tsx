'use server';

import { cookies } from 'next/headers';

export async function searchQuery(term: string) {
  const cookieStore = cookies();

  const token = cookieStore.get('accessToken')?.value;
  console.log(token);

  try {
    const response = await fetch(
      process.env.STOOD_API + `/users/search?searchTerm=${term}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      }
    );

    const data = await response.json();
    console.log('Datos recibidos:', data);

    return data;

    // Verificar si la solicitud fue exitosa (código de estado en el rango 200-299)

    // Procesar los datos recibidos...
  } catch (error: any) {
    console.error('Error al realizar la solicitud:', error.message);
    // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje de error al usuario
  }
}
