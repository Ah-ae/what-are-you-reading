import { NextRequest, NextResponse } from 'next/server';

interface Routes {
  [key: string]: boolean;
}

// 배열보다 객체로 접근하는 것이 빠르기 때문 (hash map과 같은 구조)
const publicOnlyUrls: Routes = {
  '/': true,
  '/login': true,
  '/kakao/start': true,
  '/kakao/complete': true,
};

export async function middleware(request: NextRequest) {
  // Edge Runtime에서는 iron-session을 사용할 수 없으므로 (eval 제한), 쿠키 존재 여부로 로그인 상태를 판단합니다.
  // 실제 세션 검증은 각 페이지의 서버 컴포넌트/액션에서 처리됩니다.
  const sessionCookie = request.cookies.get('wayr');
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!sessionCookie) {
    if (!exists) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  } else {
    if (exists) {
      // 로그인한 상태에서 로그인 페이지 등에 접근하려고 하는 경우,
      // 특정 페이지("/mine")로 보내주거나 404 notFound 처리 등이 가능
      return NextResponse.redirect(new URL('/mine', request.url));
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
