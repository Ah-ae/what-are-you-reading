'use client';

import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { updateRating } from '@/(bookshelf)/mine/[id]/actions';

const MAX_RATING = 5;
const starIconStyles = 'size-5 text-sky-600 dark:text-blue-500 cursor-pointer';

type Props = {
  rating: number;
  bookId: number;
};
export default function StarRating({ rating, bookId }: Props) {
  const onClick = async (index: number) => {
    let newRating = index + 1;

    // 별점이 1일 때 첫 번째 별을 다시 클릭하면 rating을 0으로 설정
    if (rating === 1 && newRating === 1) {
      newRating = 0;
    }

    await updateRating(bookId, newRating);
  };

  const stars = Array.from({ length: MAX_RATING }, (_, index) => {
    return index < rating ? (
      <SolidStarIcon key={index} className={starIconStyles} onClick={() => onClick(index)} />
    ) : (
      <StarIcon key={index} className={starIconStyles} onClick={() => onClick(index)} />
    );
  });

  return <>{stars}</>;
}
