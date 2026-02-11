import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en', 'pt'],
  defaultLocale: 'es',
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en|pt)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
