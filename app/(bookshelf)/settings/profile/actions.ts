'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function updateProfile(id: number, field: string, text: string) {
  await db.user.update({
    where: {
      id,
    },
    data: {
      [field]: text,
    },
  });

  revalidatePath('/settings/profile');
}
