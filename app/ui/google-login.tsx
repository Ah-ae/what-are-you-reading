import Link from 'next/link';
import Image from 'next/image';
import GoogleIcon from '/public/google-icon.png';

export default function GoogleLogin() {
  return (
    <Link
      href="/google/start"
      className="w-full h-10 flex-center gap-3 bg-gray-100 hover:bg-gray-200 text-[#3C1E1E] font-medium rounded-md text-center transition-colors"
    >
      <Image src={GoogleIcon} alt="Google Icon" width={24} height={24} />
      <span>Google 로그인</span>
    </Link>
  );
}
