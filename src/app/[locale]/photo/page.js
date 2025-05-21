import ImageGrid from '../components/ImageGrid';
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('photo.title'),
    description: t('photo.description'),
  };
}

export default async function Photo() {
  async function fetchPhotos() {
    const res = await fetch(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/photos?quantity=100`, { cache: 'no-store' });
    let response = await res.json();
    return response.response;
  }

  const response = await fetchPhotos();
  let images = shuffleArray(response.photos.photo);

  return (
    <main>
      <ImageGrid images={images} />
    </main>
  );
}
