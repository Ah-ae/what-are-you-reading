'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import HeaderLayout from '@/layout/header';
import StarRating from '@/ui/books/star-rating';
import {
  IMAGE_ASPECT_RATIO,
  SCALE_FACTOR,
  containerStyles,
  itemStyles,
  beforePseudoElementStyles,
} from '@/constants/style';

export default function Loading() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';
  const thumbnail = searchParams.get('thumbnail');

  return (
    <>
      <HeaderLayout />

      <section className="animate-pulse min-h-[calc(100dvh-6rem)] pb-12 flex flex-col gap-12 bg-zinc-100 dark:bg-zinc-900 *:bg-white *:dark:bg-zinc-800 group">
        <div>
          <div className="dark:bg-zinc-900 *:rounded-md">
            {title ? (
              <h3 className="py-2 text-lg font-semibold text-center">{title}</h3>
            ) : (
              <div className="mx-auto my-2 w-40 h-7 bg-neutral-600" />
            )}

            <div className="px-6 py-2 flex justify-between">
              {/* // TODO: 책 섬네일 이미지 자리 */}
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={title}
                  className="border shadow-xl"
                  width={IMAGE_ASPECT_RATIO.WIDTH * SCALE_FACTOR}
                  height={IMAGE_ASPECT_RATIO.HEIGHT * SCALE_FACTOR}
                  priority
                />
              ) : (
                <div className="w-20 h-28 bg-neutral-600" />
              )}

              <div className="flex flex-col justify-end items-end *:text-neutral-500 *:text-sm *:rounded-md">
                <div className="mb-1 w-28 h-5 bg-neutral-600" />
                <div className="mb-1 w-20 h-5 bg-neutral-600" />
                <div className="mb-1 w-28 h-5 bg-neutral-600" />
              </div>
            </div>
          </div>
          <div className={containerStyles}>
            {[1, 2, 3].map((num) => (
              <div key={num} className={itemStyles}>
                <div className="h-5 w-28 bg-neutral-600 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        <div className={containerStyles}>
          <p className={`flex ${itemStyles}`}>
            <StarRating rating={0} bookId={NaN} />
          </p>
        </div>

        <div data-before="한 줄 평" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <div className={itemStyles}>
            <div className="h-5 w-40 bg-neutral-600 rounded-md" />
          </div>
        </div>

        <div data-before="등록일" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <div className={itemStyles}>
            <div className="h-5 w-28 bg-neutral-600 rounded-md" />
          </div>
        </div>

        <div
          data-before="도서 정보는 Daum에서 제공합니다."
          className={`${beforePseudoElementStyles} ${containerStyles}`}
        >
          <p className={itemStyles}>Daum 검색에서 보기</p>
        </div>
      </section>
    </>
  );
}
