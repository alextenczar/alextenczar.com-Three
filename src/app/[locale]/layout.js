import './globals.scss'
import { Noto_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import { ScrollTools } from './components/ScrollTools'
import { IntersectionTools } from './components/IntersectionTools';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next"

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL('https://alextenczar.com'),
    manifest: '/site.webmanifest',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/opengraph-image.png`,
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: 'website',
    },
    icons: {
      icon: [
        { url: "/android-chrome-512x512.png", sizes: "512x512", type: 'image/png' },
        { url: "/android-chrome-192x192.png", sizes: "192x192", type: 'image/png' },
        { url: "/favicon-16x16.png", sizes: "16x16", type: 'image/png' },
        { url: "/favicon-32x32.png", sizes: "32x32", type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png'
    }
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {

  const { locale } = await params;
  const navT = await getTranslations({ locale, namespace: 'Nav' });

  return (
    <html lang={locale}>
      <body className={`${notoSans.className}`}><NextIntlClientProvider><Nav locale={locale} settingsTitle={navT("settings")} socialsTitle={navT("socials")} languageLabel={navT("language")} tempLabel={navT("temperature")} timeLabel={navT("time")} />{children}<Analytics /><Footer locale={locale} /><ScrollTools /><Suspense><IntersectionTools /></Suspense><SpeedInsights /></NextIntlClientProvider></body>
    </html >
  )
}
