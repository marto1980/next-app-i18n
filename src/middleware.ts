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
  const url = request.nextUrl.clone();
  const { pathname } = url

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return handleI18nRouting(request)

  // Redirect if there is no locale
  const { locale } = await fetchLocale()
  url.pathname = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}