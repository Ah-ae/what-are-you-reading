'use server';

import db from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function deleteBooks(ids: number[]) {
  console.log('delete books: ', ids);
  // TODO: 복수의 데이터 일괄 삭제 서버 액션
  //! NOT WORKING
  // 현재는 DELETE가 아닌 POST 메소드가 호출되고 있음 : POST /mine?mode=edit&items=2 200
  //   try {
  //     const deleteResult = await db.book.deleteMany({
  //       where: {
  //         id: {
  //           in: ids,
  //         },
  //       },
  //     });
  //     console.log(`Deletion result:`, deleteResult);
  //     revalidatePath('/mine');
  //     return { message: 'Deleted Books.' };
  //   } catch (error) {
  //     return { message: 'Database Error: Failed to Delete Books.' };
  //   }
}
