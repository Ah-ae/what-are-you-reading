import db from '@/lib/db';
import getSession from '@/lib/session';

export async function getUser() {
  const session = await getSession();

  try {
    if (session.id) {
      const user = await db.user.findUnique({
        where: {
          id: session.id,
        },
      });
      if (user) return user;
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
