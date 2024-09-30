import KakaoLogin from '@/ui/kakao-login';
import GoogleLogin from '@/ui/google-login';

export default function Login() {
  return (
    <div className="px-6 py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-2 *:font-medium text-xl">
        <p>안녕하세요!</p>
        <p>SNS 계정으로 로그인할 수 있어요.</p>
      </div>

      <div className="flex flex-col gap-2">
        <KakaoLogin />
        <GoogleLogin />
      </div>
    </div>
  );
}
