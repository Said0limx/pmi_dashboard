import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

export default async function middleware(request) {
  const handleI18nRouting = createMiddleware(routing);
  const response = handleI18nRouting(request);
  const token = request.cookies.get('access-token')?.value;
  if (
    !token &&
    !request.nextUrl.pathname.includes('/login') &&
    !request.nextUrl.pathname.includes('/one-id-auth')
  ) {
    return Response.redirect(new URL(`/oz/login`, request.url));
  }

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(oz|uz|ru)/:path*'],
};
