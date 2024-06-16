import { redirect } from 'next/navigation';
import { APP_BASE_URL } from '@/constants';

export function GET() {
  const kakaoAuthURL = 'https://kauth.kakao.com/oauth/authorize';
  const redirectURL = `${APP_BASE_URL}/kakao/complete`;
  const params = {
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: redirectURL,
    response_type: 'code',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${kakaoAuthURL}?${formattedParams}`;

  return redirect(finalURL);
}
