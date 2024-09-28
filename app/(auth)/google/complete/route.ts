import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { login } from '@/utils/auth';
import { APP_BASE_URL } from '@/constants';

async function getAccessToken(code: string): Promise<{
  access_token: string | null;
  expires_in: number;
  refresh_token: string | null;
  refresh_token_expires_in: number;
  error: string | null;
}> {
  const googleTokenURL = 'https://oauth2.googleapis.com/token';
  const redirectURL = `${APP_BASE_URL}/google/complete`;
  const params = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID!,
    client_secret: process.env.GOOGLE_SECURITY_PASSWORD!,
    redirect_uri: redirectURL,
    grant_type: 'authorization_code',
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${googleTokenURL}?${formattedParams}`;

  const response = await fetch(finalURL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const { access_token, expires_in, refresh_token, refresh_token_expires_in, error } = await response.json();

  return { access_token, expires_in, refresh_token, refresh_token_expires_in, error };
}

async function getGoogleUserProfile(access_token: string) {
  const googleUserProfileURL = 'https://www.googleapis.com/oauth2/v2/userinfo';

  const response = await fetch(googleUserProfileURL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    cache: 'no-cache', // next.js에서 GET request는 default가 캐싱이기 때문
  });

  return response.json();
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (!code) {
    return new Response(null, {
      status: 400,
    });
  }

  const { access_token, expires_in, refresh_token, refresh_token_expires_in, error } = await getAccessToken(code);
  if (error || !access_token) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, email, name, picture } = await getGoogleUserProfile(access_token);

  const userByGoogleId = await db.user.findUnique({
    where: {
      google_id: String(id),
    },
    select: {
      id: true,
    },
  });

  if (userByGoogleId) {
    await login(userByGoogleId.id);
    redirect('/mine');
  }

  const existingUserByUsername = await db.user.findUnique({
    where: {
      username: String(id),
    },
    select: {
      id: true,
    },
  });

  const newUser = await db.user.create({
    data: {
      username: existingUserByUsername ? `google-${id}` : String(id),
      name,
      google_id: String(id),
      avatar: picture ?? null,
    },
    select: {
      id: true,
    },
  });

  // Create a bookshelf for the new user
  await db.bookshelf.create({
    data: {
      ownerId: newUser.id,
    },
  });

  await login(newUser.id);
  redirect('/mine');
}
