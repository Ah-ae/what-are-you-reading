'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
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

  revalidatePath(`/books/${bookId}`);
}

const ReviewFormSchema = z.object({
  review: z.string(),
});

export async function updateReview(bookId: number, review: string) {
  const result = ReviewFormSchema.safeParse({
    review,
  });

  if (result.success) {
    await db.book.update({
      where: {
        id: bookId,
      },
      data: {
        review: result.data.review,
      },
    });

    revalidatePath(`/books/${bookId}`);
  } else {
    console.error(result.error);
  }
}
