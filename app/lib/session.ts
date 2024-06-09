import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

interface SessionContent {
  id?: number; // 로그인한 사용자만 쿠키에 id를 가지고 있기 때문에 id가 없는 쿠기가 있을 수 있음
}

export default function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: 'wayr',
    password: process.env.COOKIE_PASSWORD!,
  });
}
