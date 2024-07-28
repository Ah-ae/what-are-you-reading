'use client';

import Link from 'next/link';
import Image from 'next/image';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import InvalidThumbnail from '@/ui//invalid-thumbnail';
import { useBookThumbnail } from '@/utils/hooks/useBookThumbnail';
import { getImageSize } from '@/utils/image';

type Props = { id: number; thumbnail: string; title: string };

export default function BookThumbnail({ id, thumbnail, title }: Props) {
  const { width, height } = getImageSize(thumbnail);
  const { isSelected, handleClick, currentMode } = useBookThumbnail(id, thumbnail);

  if (!width || !height) {
    return <InvalidThumbnail />;
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
