'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

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

const SELECTED_ITEMS_KEY = 'selectedItems';

const updateSelectedItemsInSessionStorage = (id: number, isSelected: boolean) => {
  const items = sessionStorage.getItem(SELECTED_ITEMS_KEY);
  let updatedItems = items ? JSON.parse(items) : [];

  if (isSelected) {
    // 세션 스토리지에서 id 삭제
    updatedItems = updatedItems.filter((itemId: number) => itemId !== id);
  } else {
    // 세션 스토리지에 id 추가
    updatedItems.push(id);
  }

  sessionStorage.setItem(SELECTED_ITEMS_KEY, JSON.stringify(updatedItems));
};

type Props = { id: number; thumbnail: string; title: string };

export default function BookThumbnail({ id, thumbnail, title }: Props) {
  const { width, height } = getImageSize(thumbnail);
  const searchParams = useSearchParams();
  const currentMode = searchParams.get('mode') || 'view';
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (currentMode === 'view') sessionStorage.removeItem(SELECTED_ITEMS_KEY);
  }, [currentMode]);

  if (!width || !height) {
    return <span>Invalid thumbnail URL</span>;
  }

  const handleClick = () => {
    setIsSelected((prev) => !prev);
    updateSelectedItemsInSessionStorage(id, isSelected);
  };

  return currentMode === 'view' ? (
    <Link href={`/mine/${id}`} className="cursor-pointer">
      <Image src={thumbnail} alt={title} className="shadow-lg" width={width} height={height} />
    </Link>
  ) : isSelected ? (
    <div className="relative cursor-pointer" onClick={handleClick}>
      <div className="absolute inset-0 bg-gray-300 opacity-50" /> {/* dimmed overlay */}
      <CheckCircleIcon className="absolute bottom-2 left-1/2 transform -translate-x-1/2 size-5 bg-red-600 text-white rounded-full" />
      <Image src={thumbnail} alt={title} className="shadow-lg" width={width} height={height} />
    </div>
  ) : (
    <div className="cursor-pointer" onClick={handleClick}>
      <Image src={thumbnail} alt={title} className="shadow-lg" width={width} height={height} />
    </div>
  );
}
