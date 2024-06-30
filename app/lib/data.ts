import db from '@/lib/db';
import getSession from '@/lib/session';

export async function fetchBooks(userId: number) {
  try {
    const bookshelf = await db.bookshelf.findUnique({
      where: {
        ownerId: userId,
      },
      include: {
        books: true,
      },
    });

    if (!bookshelf) {
      throw new Error(`Bookshelf not found for user(id: ${userId})`);
    }

    return bookshelf.books;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch books of user(id : ${userId})`);
  }
}

export async function getUser() {
  try {
    const session = await getSession();
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
