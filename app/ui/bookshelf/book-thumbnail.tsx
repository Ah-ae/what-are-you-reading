'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useBookThumbnail } from '@/utils/hooks/useBookThumbnail';

// thumbnail url 예시: https://search1.kakaocdn.net/thumb/R120x174.q85/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flbook%2Fimage%2F1467038
// 위의 예시에서 /thumb/R120x174 처럼 url path에 이미지의 width, height 정보가 들어있음.
// 이를 추출하기 위한 헬퍼 함수
function getImageSize(url: string) {
  const regex = /\/thumb\/R(\d+)x(\d+)/;
  const match = url.match(regex);

  if (match) {
    return {
      width: Number(match[1]),
      height: Number(match[2]),
    };
  }

  return { width: null, height: null };
}

type Props = { id: number; thumbnail: string; title: string };

export default function BookThumbnail({ id, thumbnail, title }: Props) {
  const { width, height } = getImageSize(thumbnail);
  const { isSelected, handleClick, currentMode } = useBookThumbnail(id, thumbnail);

  if (!width || !height) {
    return <span className="w-[120px] h-[174px] flex items-center text-center bg-gray-400">Invalid thumbnail URL</span>;
  }

  return currentMode === 'view' ? (
    <Link href={`/books/${id}`} className="cursor-pointer">
      <Image src={thumbnail} alt={title} className="shadow-lg" width={width} height={height} />
    </Link>
  ) : (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gray-300 opacity-50" /> {/* dimmed overlay */}
          <CheckCircleIcon className="absolute bottom-2 left-1/2 transform -translate-x-1/2 size-5 bg-red-600 text-white rounded-full" />
        </>
      )}
      <Image src={thumbnail} alt={title} className="shadow-lg" width={width} height={height} />
    </div>
  );
}
