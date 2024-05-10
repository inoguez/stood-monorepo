'use server';

import { RedirectType, redirect } from 'next/navigation';

export async function logout() {
  redirect(process.env.STOOD_API + '/oauth/logout', 'replace' as RedirectType);
}
