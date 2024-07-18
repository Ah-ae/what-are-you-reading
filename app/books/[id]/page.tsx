import Image from 'next/image';
import { notFound } from 'next/navigation';
import db from '@/lib/db';
import HeaderLayout from '@/layout/header';
import { getImageSize } from '@/utils/image';
import { formatKoreanDate } from '@/utils/date';
import InvalidThumbnail from '@/ui/invalid-thumbnail';

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
        include: {
          author: true,
        },
      },
      translators: {
        include: {
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
      {/* //TODO: Header 버튼 스타일링 및 액션 입히기 */}
      <HeaderLayout>
        <span>뒤로</span>
        <button>편집</button>
      </HeaderLayout>

      <section className="min-h-screen pb-10 flex flex-col gap-12 bg-zinc-100 *:bg-white">
        <div>
          <h3 className="pt-2 pb-4 text-xl font-semibold text-center">{title}</h3>
          <div className="px-6 py-2 flex justify-between">
            {width && height ? (
              <Image src={thumbnail} alt={title} className="border shadow-xl" width={width} height={height} priority />
            ) : (
              <InvalidThumbnail />
            )}
            <div className="flex flex-col justify-end items-end *:text-neutral-500">
              <span>{formatKoreanDate(datetime)}</span>
              <span>{price.toLocaleString('ko-KR')}원</span>
              <span>{isbn.split(' ')[1]}</span>
            </div>
          </div>
          <div className="pl-4 flex flex-col gap-2 border-y-[1px]">
            {basicInfoItems.map((item, index) => (
              <p key={index} className="py-3 border-b-[1px] last:border-b-0">
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="pl-4 flex flex-col gap-2 border-y-[1px]">
          <p className="py-3 border-b-[1px] last:border-b-0">별점: {rating}</p>
          {review && <p className="py-3 border-b-[1px] last:border-b-0">한 줄 평: {review}</p>}
        </div>

        <div
          data-before="등록일"
          className="before:content-[attr(data-before)] before:absolute before:-translate-y-8 before:text-neutral-500 pl-4 flex flex-col gap-2 border-y-[1px]"
        >
          <p className="py-3 border-b-[1px] last:border-b-0">{formatKoreanDate(created_at)}</p>
        </div>

        <div
          data-before="도서 정보는 Daum에서 제공합니다."
          className="before:content-[attr(data-before)] before:absolute before:-translate-y-8 before:text-neutral-500 pl-4 flex flex-col gap-2 border-y-[1px]"
        >
          <p className="py-3 border-b-[1px] last:border-b-0">다음 검색에서 보기</p>
        </div>
      </section>
    </>
  );
}
