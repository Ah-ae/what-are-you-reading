'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateRating(bookId: number, rating: number) {
  await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      rating: rating,
    },
  });

  revalidatePath(`/books/${bookId}`);
}
