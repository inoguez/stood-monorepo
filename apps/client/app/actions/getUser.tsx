'use server';
import { axiosAPI } from '../utils/axiosAPI';
export async function getUser() {
  try {
    const { data } = await axiosAPI.get('/users/authenticated');

    // const token = cookies().get('accessToken')?.value;
    // console.log(token);
    // const response = await fetch(
    //   process.env.STOOD_API + `/friendRequest/send`,
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `${token}`,
    //     },
    //   }
    // );

    // const data = await response.json();
    return data;
  } catch (error) {
    console.error('no se pudo pa', error);
  }
}
