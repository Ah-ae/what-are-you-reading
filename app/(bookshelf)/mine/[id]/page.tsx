import Link from 'next/link';
import Image from 'next/image';
import { unstable_cache as nextCache } from 'next/cache';
import { notFound } from 'next/navigation';
import { getBook, updateReview } from '@/(bookshelf)/mine/[id]/actions';
import { getActiveLoan } from '@/(bookshelf)/loan/queries';
import HeaderLayout from '@/layout/header';
import EditableBox from '@/ui/editable-box';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import BookLoanTag from '@/ui/bookshelf/book-loan-tag';
import DeleteBookButton from '@/ui/books/delete-book-button';
import LendBookButton from '@/ui/books/lend-book-button';
import LoanInfoSection from '@/ui/books/loan-info-section';
import ReturnBookButton from '@/ui/books/return-book-button';
import StarRating from '@/ui/books/star-rating';
import { getImageSize } from '@/utils/image';
import { formatKoreanDate } from '@/utils/date';
import {
  IMAGE_ASPECT_RATIO,
  SCALE_FACTOR,
  containerStyles,
  itemStyles,
  beforePseudoElementStyles,
} from '@/constants/style';

type Props = {
  params: { id: string };
};

const getCachedBook = (id: number) => {
  const cashedOperation = nextCache(getBook, ['book'], {
    tags: [`book-${id}`],
  });

  return cashedOperation(id);
};

export default async function BookDetail({ params }: Props) {
  const id = Number(params.id);
  // url에 /books/abc 처럼 숫자가 아닌 id를 직접 입력하고 진입할 때
  if (Number.isNaN(id)) return notFound();

  const [book, activeLoan] = await Promise.all([getCachedBook(id), getActiveLoan(id)]);
  // db에 해당 id의 book이 없을 때
  if (!book) return notFound();

  const borrowerDisplayName = activeLoan
    ? (activeLoan.borrower?.name ?? activeLoan.borrowerName ?? '알 수 없음')
    : null;

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
      <HeaderLayout />

      <section className="min-h-[calc(100dvh-6rem)] pb-12 flex flex-col gap-12 bg-zinc-100 dark:bg-zinc-900 *:bg-white *:dark:bg-zinc-800 group">
        <div>
          <div className="dark:bg-zinc-900">
            <h3 className="py-2 text-lg font-semibold text-center">{title}</h3>
            <div className="px-6 py-2 flex justify-between">
              {width && height ? (
                <div className="relative">
                  {activeLoan && <BookLoanTag type="lent" />}
                  <Image
                    src={thumbnail}
                    alt={title}
                    className="border shadow-xl"
                    width={IMAGE_ASPECT_RATIO.WIDTH * SCALE_FACTOR}
                    height={IMAGE_ASPECT_RATIO.HEIGHT * SCALE_FACTOR}
                    priority
                  />
                </div>
              ) : (
                <InvalidThumbnail />
              )}
              <div className="flex flex-col justify-end items-end *:text-neutral-500 *:text-sm">
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

        {activeLoan && <LoanInfoSection type="lent" personName={borrowerDisplayName!} lentAt={activeLoan.lent_at} />}

        <div className={containerStyles}>
          <p className={`flex ${itemStyles}`}>
            <StarRating rating={rating} bookId={id} />
          </p>
        </div>

        <div data-before="한 줄 평" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <div className={itemStyles}>
            <EditableBox id={id} field="review" text={review} onUpdate={updateReview} />
          </div>
        </div>

        <div data-before="등록일" className={`${beforePseudoElementStyles} ${containerStyles}`}>
          <p className={itemStyles}>{formatKoreanDate(created_at)}</p>
        </div>

        <div
          data-before="도서 정보는 Daum에서 제공합니다."
          className={`${beforePseudoElementStyles} ${containerStyles}`}
        >
          <Link href={url} className="text-neutral-900 dark:text-gray-100">
            <p className={itemStyles}>Daum 검색에서 보기</p>
          </Link>
        </div>

        <div className="flex flex-col gap-4 !bg-transparent">
          {activeLoan ? <ReturnBookButton loanId={activeLoan.id} /> : <LendBookButton bookId={id} />}
          <DeleteBookButton bookId={id} />
        </div>
      </section>
    </>
  );
}
