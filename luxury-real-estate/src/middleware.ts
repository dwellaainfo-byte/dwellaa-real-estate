import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Never use redirects for locale detection
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(fr|it)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};