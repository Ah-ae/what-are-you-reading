import { notFound } from 'next/navigation';
import db from '@/lib/db';
import getSession from '@/lib/session';

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
      },
    });
    if (user) return user;
  }
  notFound();
}
