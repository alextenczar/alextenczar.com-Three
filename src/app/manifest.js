import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export default async function manifest() {
    const t = await getTranslations({
        locale: routing.defaultLocale,
        namespace: 'Manifest'
    });

    return {
        name: t('name'),
        short_name: t('name'),
        description: t('description'),
        start_url: '/',
        icons: [
            {
                "src": "/android-chrome-192x192.png",
                "sizes": "192x192",
                "type": "image/png"
            },
            {
                src: "/android-chrome-512x512.png",
                "sizes": "512x512",
                "type": "image/png"
            }
        ],
        theme_color: "#000000",
        background_color: "#ffffff",
        display: "browser"
    };
}