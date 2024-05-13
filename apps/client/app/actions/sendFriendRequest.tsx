'use server';

import { cookies } from 'next/headers';

export async function sendFriendRequest(formData: FormData) {
  const cookieStore = cookies();

  const token = cookieStore.get('accessToken')?.value;
  console.log(token);

  const rawFormData = {
    senderId: cookies().get('userId')?.value,
    email: formData.get('email'),
  };
  console.log(rawFormData);
  try {
    const response = await fetch(
      process.env.STOOD_API + `/friendRequest/send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(rawFormData),
      }
    );

    const data = await response.json();
    console.log('Datos recibidos:', data);
    // const msg = data?.message ? data.message : data?.error;
    // toast(msg);

    return data;

    // Verificar si la solicitud fue exitosa (código de estado en el rango 200-299)

    // Procesar los datos recibidos...
  } catch (error: any) {
    console.log(error);
    console.error('Error al realizar la solicitud:', error.message);
    // Manejar el error apropiadamente, por ejemplo, mostrar un mensaje de error al usuario
  }
}
