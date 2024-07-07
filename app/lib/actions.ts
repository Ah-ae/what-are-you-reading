'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

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
