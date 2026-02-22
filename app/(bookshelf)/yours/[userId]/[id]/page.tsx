import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getBook } from '@/(bookshelf)/mine/[id]/actions';
import { getActiveLoan } from '@/(bookshelf)/loan/queries';
import { verifyFriendship, verifyBookOwnership } from '@/(bookshelf)/yours/actions';
import { getUser } from '@/lib/data';
import HeaderLayout from '@/layout/header';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import BookLoanTag from '@/ui/bookshelf/book-loan-tag';
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

type Props = { params: { userId: string; id: string } };

export default async function FriendBookDetail({ params }: Props) {
  const userId = Number(params.userId);
  const bookId = Number(params.id);
  if (Number.isNaN(userId) || Number.isNaN(bookId)) return notFound();

  const isFriend = await verifyFriendship(userId);
  if (!isFriend) return notFound();

  const [isOwner, book, activeLoan, currentUser] = await Promise.all([
    verifyBookOwnership(userId, bookId),
    getBook(bookId),
    getActiveLoan(bookId),
    getUser(),
  ]);
  if (!isOwner || !book) return notFound();

  const isBorrower = activeLoan && currentUser && activeLoan.borrowerId === currentUser.id;

  const { title, thumbnail, datetime, price, authors, translators, publisher, url, isbn, rating, review, created_at } =
    book;

  const { width, height } = getImageSize(thumbnail);

  const authorNames = authors.map((author) => author.author.name);
  const translatorNames = translators.map((translator) => translator.translator.name);
  const basicInfoItems = [
    `${authorNames.join(', ')} 지음`,
    translatorNames.length > 0 ? `${translatorNames.join(', ')} 옮김` : null,
    publisher,
  ].filter(Boolean);

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
                  {isBorrower && <BookLoanTag type="borrowed" />}
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

        {isBorrower && activeLoan.lender && (
          <LoanInfoSection type="borrowed" personName={activeLoan.lender.name} lentAt={activeLoan.lent_at} />
        )}

        {!isBorrower && (
          <>
            <div className={containerStyles}>
              <p className={`flex ${itemStyles}`}>
                <StarRating rating={rating} bookId={bookId} readOnly />
              </p>
            </div>

            <div data-before="한 줄 평" className={`${beforePseudoElementStyles} ${containerStyles}`}>
              <div className={itemStyles}>
                {review ? <p>{review}</p> : <p className="text-zinc-400">작성된 한 줄 평이 없습니다.</p>}
              </div>
            </div>
          </>
        )}

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

        {isBorrower && <ReturnBookButton loanId={activeLoan.id} redirectTo="/mine" />}
      </section>
    </>
  );
}
