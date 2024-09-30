'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getBooks(userId: number) {
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

export async function deleteBooks(ids: number[]) {
  try {
    await db.book.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    console.log('Books deleted successfully');
    revalidatePath('/mine');
    return { message: 'Deleted Books.' };
  } catch (error) {
    console.error('Error deleting books:', error);
    return { message: 'Database Error: Failed to Delete Books.' };
  }
}
