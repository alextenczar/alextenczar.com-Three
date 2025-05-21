import Head from 'next/head'
import ImageGrid from '../components/ImageGrid';
import { getTranslations } from "next-intl/server";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('photo.title'),
    description: t('photo.description'),
  };
}

export default async function Photo(ref) {
  const res = await fetch(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/photos?quantity=100`, { cache: 'no-store' })
  let response = await res.json();
  response = response.response

  let images = shuffleArray(response.photos.photo);

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </Head>
      <main>
        <ImageGrid images={images} />
      </main>
    </>
  )
}
