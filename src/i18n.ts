import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { Locale } from './i18n.types';

// Can be imported from a shared config
const locales = ['en', 'de'];

const getLocale = async (): Promise<Locale> => {
    const response = await fetch('http://localhost:3001/locale', {cache: 'no-store'});
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Locale = await response.json();
    return data;
};

export default getRequestConfig(async () => {

    const { locale } = await getLocale()
console.log('locale in getRequestConfig:', locale)
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});