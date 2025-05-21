import { host } from '../config';
import { routing } from '../i18n/routing';
import { getPathname } from '../i18n/navigation';

export default function sitemap() {
    return [...getEntries('/'), ...getEntries('/blog'), ...getEntries('/works'), ...getEntries('/contact'), ...getEntries('/photo')];
}

function getEntries(href) {
    return routing.locales.map((locale) => ({
        url: getUrl(href, locale),
        alternates: {
            languages: Object.fromEntries(
                routing.locales.map((cur) => [cur, getUrl(href, cur)])
            )
        }
    }));
}

function getUrl(href, locale) {
    const pathname = getPathname({ locale, href });
    return host + pathname;
}