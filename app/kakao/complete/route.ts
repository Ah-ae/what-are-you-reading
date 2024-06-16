import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { login } from '@/utils/login';

async function getAccessToken(code: string): Promise<{
  access_token: string | null;
  expires_in: number;
  refresh_token: string | null;
  refresh_token_expires_in: number;
  error: string | null;
}> {
  const baseURL = 'https://kauth.kakao.com/oauth/token';
  const redirectURL = 'http://localhost:3000/kakao/complete';
  const params = {
    grant_type: 'authorization_code',
    client_id: process.env.KAKAO_REST_API_KEY!,
    redirect_uri: redirectURL,
    code,
    client_secret: process.env.KAKAO_CLIENT_SECRET!,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

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

async function getKakaoUserProfile(access_token: string) {
  const baseURL = 'https://kapi.kakao.com/v2/user/me';

  const response = await fetch(baseURL, {
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

  const {
    id,
    kakao_account: {
      profile: { nickname, thumbnail_image_url },
    },
  } = await getKakaoUserProfile(access_token);

  const userByKakaoId = await db.user.findUnique({
    where: {
      kakao_id: String(id),
    },
    select: {
      id: true,
    },
  });

  if (userByKakaoId) {
    login(userByKakaoId.id);
    return redirect('/mine');
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
      username: existingUserByUsername ? `kakao-${id}` : String(id),
      name: nickname,
      kakao_id: String(id),
      avatar: thumbnail_image_url,
    },
    select: {
      id: true,
    },
  });

  login(newUser.id);
  return redirect('/mine');
}
