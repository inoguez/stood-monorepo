import Error from 'next/error';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies, headers } from 'next/headers';

const protectedRoutes = ['/'];
const publicRoutes = ['/auth', '/signup'];
// This function can be marked `async` if using `await` inside

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
export async function middleware(request: NextRequest, re: NextResponse) {
  console.log(request.headers, 'headersQ');
  console.log(request.headers.get('Authorization'), 'HeaderQ');
  const nextUrl = request.nextUrl;
  const path = nextUrl.pathname;
  console.log(path, 'path');
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const accessToken = cookies().get('accessToken')?.value;
  const refreshToken = cookies().get('refreshToken')?.value;

  //refactor this
  console.log('accessToken1', accessToken, 'refreshToken1', refreshToken);
  const token = accessToken;
  console.log(token, 'aaa');
  const response = await fetch(process.env.STOOD_API + '/oauth/isSignedIn', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    console.log('Error al verificar si estas iniciado');
  }

  const res = await response.json();
  console.log(res, 'respuesta');
  //Validar el expire date con un date.now

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !res.isSignedIn) {
    console.log('222');
    return NextResponse.redirect(new URL('/auth', nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  console.log(isPublicRoute, 'isPublicRoute');
  console.log(res.isSignedIn, 'res.isSignedIn ');
  console.log(
    !nextUrl.pathname.startsWith('/'),
    '!nextUrl.pathname.startsWith(/)'
  );
  if (isPublicRoute && res.isSignedIn && !nextUrl.pathname.startsWith('/')) {
    console.log('3333');

    return NextResponse.redirect(new URL('/', nextUrl));
  }
  console.log('4444');

  // const headers = new Headers(request.headers);

  // console.log(headers.get('Authorization'), 'middleware');

  // const authorizationHeader = request.headers.get('Authorization');

  // console.log(authorizationHeader, 'header****************');

  // const nextUrl = request.nextUrl;
  // const searchParamsAT = nextUrl.searchParams.get('accessToken');
  // const searchParamsRF = nextUrl.searchParams.get('refreshToken');

  // console.log('accessToken', accessToken, 'refreshToken', refreshToken);

  // const token = searchParamsAT ? searchParamsAT : accessToken;
  // console.log('*****', token);

  // if (!response.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   // throw new Error('Failed to fetch data');
  //   console.log('erroressss');
  // }
  // // if (!res.isSignedIn)
  // //   return NextResponse.redirect(new URL('/auth', request.url));
  // console.log('respuesta', res);

  // return NextResponse.redirect(new URL('/home', request.url));
  const resp = NextResponse.next();
  resp.cookies.set('userId', res?.user?.userId);
  return resp;
}

// See "Matching Paths" below to learn more
// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
