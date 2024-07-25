import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { fetchLocale, locales } from './fetchLocale';

export default getRequestConfig(async () => {

    const { locale } = await fetchLocale()
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});