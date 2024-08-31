import Link from 'next/link';
import Image from 'next/image';

export default function KakaoLogin() {
  return (
    <Link
      href="/kakao/start"
      className="w-full h-10 flex-center gap-3 bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] font-medium rounded-md text-center transition-colors"
    >
      <Image
        src={process.env.NODE_ENV === 'production' ? process.env.PUBLIC_URL + '/kakao-icon.png' : '/kakao-icon.png'}
        alt="KakaoTalk Icon"
        width={24}
        height={24}
      />
      <span>카카오 로그인</span>
    </Link>
  );
}
