'use server';

import db from '@/lib/db';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function updateRating(bookId: number, rating: number) {
  await db.book.update({
    where: {
      id: bookId,
    },
    data: {
      rating,
    },
  });

  revalidateTag(`book-${bookId}`);
}

const ReviewFormSchema = z.object({
  review: z.string(),
});

export async function updateReview(bookId: number, field: string, review: string) {
  const result = ReviewFormSchema.safeParse({
    review,
  });

  if (result.success) {
    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        [field]: result.data.review,
      },
    });

    revalidateTag(`book-${bookId}`);
  } else {
    console.error(result.error);
  }
}

export async function deleteBook(bookId: number) {
  await db.book.delete({
    where: {
      id: bookId,
    },
  });

  redirect('/mine');
}
