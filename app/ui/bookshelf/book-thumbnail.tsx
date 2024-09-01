'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import InvalidThumbnail from '@/ui//invalid-thumbnail';
import { getImageSize } from '@/utils/image';
import { IMAGE_ASPECT_RATIO } from '@/constants/style';
import { currentModeAtom, selectedItemsAtom } from '@/store/atoms';

const SCALE_FACTOR = 4;

type Props = { id: number; thumbnail: string; title: string };

export default function BookThumbnail({ id, thumbnail, title }: Props) {
  const { width, height } = getImageSize(thumbnail);
  const currentMode = useAtomValue(currentModeAtom);
  const [isSelected, setIsSelected] = useState(false);
  const setSelectedItems = useSetAtom(selectedItemsAtom);

  useEffect(() => {
    setIsSelected(false);
  }, [currentMode]);

  const handleClick = () => {
    // 로컬 상태 isSelected 값 업데이트
    setIsSelected((prev) => !prev);

    // 전역 상태 selectedItems 값 업데이트
    if (isSelected) {
      // id 삭제
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      // id 추가
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  if (!width || !height) {
    return <InvalidThumbnail />;
  }

  return currentMode === 'view' ? (
    <Link href={`/books/${id}`} className="cursor-pointer" scroll={false}>
      <Image
        src={thumbnail}
        alt={title}
        className="shadow-lg"
        width={IMAGE_ASPECT_RATIO.WIDTH * SCALE_FACTOR}
        height={IMAGE_ASPECT_RATIO.HEIGHT * SCALE_FACTOR}
      />
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
