import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-dvh px-6 py-12 flex flex-col justify-between items-center">
      <div className="my-auto flex flex-col items-center gap-2 *:font-medium">
        <Image
          src={
            process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL + '/hero_256x256.png' : '/hero_256x256.png'
          }
          alt="요즘뭐보니 대표 이미지"
          width={256}
          height={256}
          priority
        />
        <h1 className="my-2 text-4xl">요즘 뭐 보니</h1>
        <p className="text-2xl">친구들의 책장을 구경해 볼까요?</p>
      </div>
      <div className="w-full flex flex-col items-center gap-3">
        <Link href="/login" className="primary-btn py-2.5 text-lg">
          시작하기
        </Link>
      </div>
    </div>
  );
}
