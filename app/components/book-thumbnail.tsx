/* eslint-disable @next/next/no-img-element */

type Props = { thumbnail: string; title: string };

export default function BookThumbnail({ thumbnail, title }: Props) {
  return <img src={thumbnail} alt={`${title} thumbnail`} className="shadow-lg" />;
}
