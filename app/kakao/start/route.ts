import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://kauth.kakao.com/oauth/authorize';
  // TODO: 배포 후에 redirectURL 변경 필요 (localhost 대신 도메인)
  const redirectURL = 'http://localhost:3000/kakao/complete';
  const params = {
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: redirectURL,
    response_type: 'code',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  return redirect(finalURL);
}
