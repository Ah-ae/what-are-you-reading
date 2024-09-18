'use client';

import { useOptimistic } from 'react';
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
  const updateFn = (_: number, newRating: number) => newRating;
  const [optimisticRating, setOptimisticRating] = useOptimistic(rating, updateFn);

  const onClick = async (index: number) => {
    let newRating = index + 1;

    // 별점이 1일 때 첫 번째 별을 다시 클릭하면 rating을 0으로 설정
    if (optimisticRating === 1 && newRating === 1) {
      newRating = 0;
    }

    // 기존의 rating 값을 기억 (낙관적 업데이트 실패 시 롤백용)
    const prevRating = optimisticRating;

    // ui를 먼저 낙관적으로 업데이트
    setOptimisticRating(newRating);

    try {
      // 서버 업데이트
      await updateRating(bookId, newRating);
    } catch (error) {
      console.error('Failed to update rating:', error);

      // 서버 업데이트 실패 시 원래 상태로 롤백
      setOptimisticRating(prevRating);
    }
  };

  const stars = Array.from({ length: MAX_RATING }, (_, index) => {
    return index < optimisticRating ? (
      <SolidStarIcon key={index} className={starIconStyles} onClick={() => onClick(index)} />
    ) : (
      <StarIcon key={index} className={starIconStyles} onClick={() => onClick(index)} />
    );
  });

  return <>{stars}</>;
}
