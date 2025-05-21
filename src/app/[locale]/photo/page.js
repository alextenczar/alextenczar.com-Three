import ImageGrid from '../components/ImageGrid';
import { getTranslations } from "next-intl/server";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('photo.title'),
    description: t('photo.description'),
  };
}

export default async function Photo() {

  return (
    <main>
      <div className='min-h-[100vh]'>
        <ImageGrid />
      </div>
    </main>
  );
}
