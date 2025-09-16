// app/lib/session.ts
import { cookies, headers } from 'next/headers';
import { auth } from './auth';
import { redirect } from 'next/navigation';
import { cache } from 'react';

export const getCurrentUser = cache(async () => {
  try {
    const cookieStore = await cookies();
    const session = await auth.api.getSession({
        headers:await headers(),
      });

    if (!session) {
      redirect('/login');
      return null;
    }

    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name || '',
    };
  } catch (error) {
    console.error('Failed to get session:', error);
    redirect('/login');
    return null;
  }
});