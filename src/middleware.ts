// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { Locale } from './i18n.types';
const locales = ['en', 'de'];

// Default locale if backend doesn't provide one
const defaultLocale = 'en';

// Initialize next-intl middleware
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
});

const getLocale = async (): Promise<Locale> => {
    const response = await fetch('http://localhost:3001/locale', {cache: 'no-store'});
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Locale = await response.json();
    return data;
};

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Skip static files and API routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Fetch user locale from backend or service
  const {locale: userLocale } = await getLocale();

  // Check if the pathname already includes a locale prefix
  const hasLocalePrefix = locales.some(locale => pathname.startsWith(`/${locale}`));

  // Redirect root path to user locale
  if (pathname === '/') {
    url.pathname = `/${userLocale}`;
    return NextResponse.redirect(url);
  }

  // Redirect paths without a locale prefix to include the user locale
  if (!hasLocalePrefix) {
    url.pathname = `/${userLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // If the locale is already included or other cases, process normally
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Match all routes except for static files and API routes
    '/((?!api|_next|.*\\..*).*)',
  ],
};
