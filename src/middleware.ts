import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { Locale } from './i18n.types';

const locales = ['de', 'en']

const getLocale = async (): Promise<Locale> => {
  const response = await fetch('http://localhost:3001/locale');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Locale = await response.json();
  return data;
};




export async function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const { locale } = await getLocale()
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