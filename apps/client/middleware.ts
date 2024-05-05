import Error from 'next/error';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('middleware');

  const authorizationHeader = request.headers.get('Authorization');

  console.log(authorizationHeader, 'header****************');

  const nextUrl = request.nextUrl;
  const searchParamsAT = nextUrl.searchParams.get('accessToken');
  const searchParamsRF = nextUrl.searchParams.get('refreshToken');

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  console.log('accessToken', accessToken, 'refreshToken', refreshToken);

  const token = searchParamsAT ? searchParamsAT : accessToken;
  console.log('*****', token);
  const response = await fetch(process.env.STOOD_API + '/oauth/isSignedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });
  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    // throw new Error('Failed to fetch data');
    console.log('erroressss');
  }
  const res = await response.json();
  if (!res.isSignedIn)
    return NextResponse.redirect(new URL('/auth', request.url));
  console.log('respuesta', res);
  // return NextResponse.redirect(new URL('/home', request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
