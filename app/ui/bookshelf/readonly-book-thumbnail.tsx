import Link from 'next/link';
import Image from 'next/image';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import BookLoanTag from '@/ui/bookshelf/book-loan-tag';
import { getImageSize } from '@/utils/image';
import { IMAGE_ASPECT_RATIO, SCALE_FACTOR } from '@/constants/style';
import type { LoanStatus } from '@/types/loan';

type Props = { id: number; thumbnail: string; title: string; basePath: string; loanStatus?: LoanStatus | null };

export default function ReadOnlyBookThumbnail({ id, thumbnail, title, basePath, loanStatus }: Props) {
  const { width, height } = getImageSize(thumbnail);

  if (!width || !height) {
    return <InvalidThumbnail />;
  }

  return (
    <Link
      href={{
        pathname: `${basePath}/${id}`,
        query: { thumbnail, title },
      }}
      className="relative cursor-pointer"
    >
      {loanStatus && <BookLoanTag type={loanStatus} />}
      <Image
        src={thumbnail}
        alt={title}
        className="shadow-lg md:scale-125"
        width={IMAGE_ASPECT_RATIO.WIDTH * SCALE_FACTOR}
        height={IMAGE_ASPECT_RATIO.HEIGHT * SCALE_FACTOR}
      />
    </Link>
  );
}
