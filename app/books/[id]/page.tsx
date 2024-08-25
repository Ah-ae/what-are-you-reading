import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import HeaderLayout from '@/layout/three-items-header';
import EditableReview from '@/ui/books/editable-review';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import StarRating from '@/ui/books/star-rating';
import BackButton from '@/ui/back-button';
import { getImageSize } from '@/utils/image';
import { formatKoreanDate } from '@/utils/date';

const containerStyles = 'px-4 flex flex-col gap-2 border-y-[1px] dark:border-neutral-700';
const itemStyles = 'py-3 border-b-[1px] last:border-b-0 dark:border-neutral-700';
const beforePseudoElementStyles =
  'before:content-[attr(data-before)] before:absolute before:-translate-y-8 before:text-neutral-500';

type Props = {
  params: { id: string };
};

async function getBook(id: number) {
  const book = await db.book.findUnique({
    where: {
      id,
    },
    include: {
      authors: {
        select: {
          author: true,
        },
      },
      translators: {
        select: {
          translator: true,
        },
      },
    },
  });

  return book;
}

export default async function BookDetail({ params }: Props) {
  const id = Number(params.id);
  // url에 /books/abc 처럼 숫자가 아닌 id를 직접 입력하고 진입할 때
  if (Number.isNaN(id)) return notFound();

  const book = await getBook(id);
  // db에 해당 id의 book이 없을 때
  if (!book) return notFound();

  const { title, thumbnail, datetime, price, authors, translators, publisher, url, isbn, rating, review, created_at } =
    book;

  const { width, height } = getImageSize(thumbnail);

  const authorNames = authors.map((author) => author.author.name);
  const translatorNames = translators.map((translator) => translator.translator.name);
  const basicInfoItems = [
    `${authorNames.join(', ')} 지음`,
    translatorNames.length > 0 ? `${translatorNames.join(', ')} 옮김` : null,
    publisher,
  ].filter(Boolean); // null 또는 빈 문자열 등을 제거하여 필요한 요소만 포함

  return (
    <>
      <HeaderLayout>
        <BackButton />
      </HeaderLayout>

      {/* Note: `pt-[60px]` - header height만큼 공간 확보 */}
      <section className="pt-[60px] flex flex-col gap-12 bg-zinc-100 dark:bg-zinc-900 *:bg-white *:dark:bg-zinc-800">
        <div>
          <div className="dark:bg-zinc-900">
            <h3 className="pt-2 pb-4 text-xl font-semibold text-center">{title}</h3>
            <div className="px-6 py-2 flex justify-between">
              {width && height ? (
                <Image
                  src={thumbnail}
                  alt={title}
                  className="border shadow-xl"
                  width={width}
                  height={height}
                  priority
                />
              ) : (
                <InvalidThumbnail />
              )}
              <div className="flex flex-col justify-end items-end *:text-neutral-500">
                <span>{formatKoreanDate(datetime)}</span>
                <span>{price.toLocaleString('ko-KR')}원</span>
                <span>{isbn.split(' ')[1]}</span>
              </div>
            </div>
          </div>
          <div className={containerStyles}>
            {basicInfoItems.map((item, index) => (
              <p key={index} className={itemStyles}>
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className={containerStyles}>
          <p className={`flex ${itemStyles}`}>
            <StarRating rating={rating} bookId={id} />
          </p>
        </div>

        <div data-before="한 줄 평" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <div className={itemStyles}>
            <EditableReview review={review} bookId={id} />
          </div>
        </div>

        <div data-before="등록일" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <p className={itemStyles}>{formatKoreanDate(created_at)}</p>
        </div>

        <div
          data-before="도서 정보는 Daum에서 제공합니다."
          className={`${beforePseudoElementStyles} ${containerStyles} hover:bg-zinc-200 dark:hover:bg-neutral-600`}
        >
          <Link href={url} className="text-neutral-900 dark:text-gray-100">
            <p className={itemStyles}>Daum 검색에서 보기</p>
          </Link>
        </div>

        {/* // TODO: '책 삭제' text button 마크업 및 DB 연동 */}
      </section>
    </>
  );
}
