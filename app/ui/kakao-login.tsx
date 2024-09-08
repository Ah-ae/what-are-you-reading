import Link from 'next/link';
import Image from 'next/image';
import KakaoIcon from '/public/kakao-icon.png';

export default function KakaoLogin() {
  return (
    <Link
      href="/kakao/start"
      className="w-full h-10 flex-center gap-3 bg-[#FEE500] hover:bg-[#FADA0A] text-[#3C1E1E] font-medium rounded-md text-center transition-colors"
    >
      <Image src={KakaoIcon} alt="KakaoTalk Icon" width={24} height={24} />
      <span>카카오 로그인</span>
    </Link>
  );
}
