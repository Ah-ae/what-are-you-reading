import { redirect } from 'next/navigation';
import { APP_BASE_URL } from '@/constants';

export function GET() {
  const googleAuthURL = 'https://accounts.google.com/o/oauth2/v2/auth';
  const redirectURL = `${APP_BASE_URL}/google/complete`;
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectURL,
    response_type: 'code',
    scope: 'email profile',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${googleAuthURL}?${formattedParams}`;

  return redirect(finalURL);
}
