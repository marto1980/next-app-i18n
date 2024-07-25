import { getRequestConfig } from 'next-intl/server';
import { Locale } from './i18n.types';

const getLocale = async (): Promise<Locale> => {
  const response = await fetch('http://localhost:3001/locale', {
    cache: 'no-store'
  })
  console.log('response in getLocale', response)
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: Locale = await response.json();
  console.log('data in getLocale:', data);
  return data;
};

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const { locale } = await getLocale()
  console.log('locale in i18n.ts:', locale)
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

