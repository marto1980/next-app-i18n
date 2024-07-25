import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { fetchLocale, locales } from './fetchLocale';

// Default locale if backend doesn't provide one
const defaultLocale = 'en';

// Initialize next-intl middleware
const handleI18nRouting = createMiddleware({
  locales,
  defaultLocale,
})


export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const url = request.nextUrl.clone();
  const { pathname } = url

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Skip static files and API routes
  if (pathname.startsWith('/_next/') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (pathnameHasLocale) return handleI18nRouting(request);

  const { locale } = await fetchLocale()
  // Redirect root path to user locale
  if (pathname === '/') {
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${locale}${pathname}`
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}