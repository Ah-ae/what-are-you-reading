import db from '@/lib/db';

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
