// src/api/locale/route.ts
import { Locale } from '@/i18n.types';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<Locale>> {
  try {
    const localeResponse = await fetch('http://localhost:3001/locale');
    if (!localeResponse.ok) {
      return NextResponse.json({ locale: 'en' }); // Fallback if fetching fails
    }

    const localeData = await localeResponse.json();
    return NextResponse.json({ locale: localeData.locale });

  } catch (error) {
    console.error('Error fetching locale:', error);
    return NextResponse.json({ locale: 'en' }); // Fallback in case of error
  }
}

