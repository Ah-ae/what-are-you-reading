import Link from 'next/link';
import Image from 'next/image';
import InvalidThumbnail from '@/ui/invalid-thumbnail';
import { getImageSize } from '@/utils/image';
import { IMAGE_ASPECT_RATIO } from '@/constants/style';

const SCALE_FACTOR = 4;

type Props = { id: number; thumbnail: string; title: string; basePath: string };

export default function ReadOnlyBookThumbnail({ id, thumbnail, title, basePath }: Props) {
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
      className="cursor-pointer"
    >
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
