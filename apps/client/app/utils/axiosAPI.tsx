import axios from 'axios';
import { cookies } from 'next/headers';
export const axiosAPI = axios.create({
  baseURL: process.env.STOOD_API,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `${cookies().get('accessToken')?.value}`,
  },
});
