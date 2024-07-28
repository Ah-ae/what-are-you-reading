import Image from 'next/image';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import { formatKoreanDate } from '@/utils/date';
import { getImageSize } from '@/utils/image';
import type { KaKaoBookResponse } from '@/books/add/list/page';

type Props = { book: KaKaoBookResponse };

export default async function BookCard({ book }: Props) {
  const { title, thumbnail, publisher, authors, translators, datetime } = book;
  const { width, height } = getImageSize(thumbnail);

  return (
    <li className="pb-3 flex gap-5 border-b last:border-b-0 border-neutral-200">
      <div className="relative">
        {width && height ? (
          <Image src={thumbnail} alt={title} width={width * 0.6} height={height * 0.6} />
        ) : (
          <InvalidThumbnail />
        )}
      </div>
      <div className="flex flex-col justify-between gap-2 *:rounded-md">
        <span className="font-semibold">{title}</span>
        <div className="flex flex-col *:text-neutral-500">
          <span>
            {authors.join(', ')} 지음{translators.length > 0 && `, ${translators.join(', ')} 옮김`}
          </span>
          <span>{publisher}</span>
          <span className="">{formatKoreanDate(datetime)}</span>
        </div>
      </div>
    </li>
  );
}
