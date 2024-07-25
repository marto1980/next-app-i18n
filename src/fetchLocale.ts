import { Locale } from "./i18n.types";

const locales = ['en', 'de'];

const fetchLocale = async (): Promise<Locale> => {
    const response = await fetch('http://localhost:3001/locale', { cache: 'no-store' });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data: Locale = await response.json();
    return data;
}

export { fetchLocale, locales };
