import { redirect } from 'next/navigation';

export default async function Login() {
  async function login(formData: FormData) {
    'use server';
    const response = await fetch(process.env.STOOD_API + '/request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    console.log('redireccionamiento', data);
    return redirect(data.url);
  }
  return (
    <div className='grow grid place-content-center'>
      <form action={login}>
        <button
          type='submit'
          className='flex items-center  gap-2 rounded-md bg-neutral-400 text-neutral-700 px-2 py-1'
        >
          <svg
            stroke='currentColor'
            fill='currentColor'
            strokeWidth='0'
            viewBox='0 0 488 512'
            height='20px'
            width='20px'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'></path>
          </svg>
          Login with google
        </button>
      </form>
    </div>
  );
}
