import { notFound } from 'next/navigation';
import Image from 'next/image';
import '@/app/styles/indv-photo.scss';
import PhotoInfoMap from '../../components/PhotoInfoMap';
import { Link } from '@/i18n/navigation';
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('photo.title'),
        description: t('photo.description'),
    };
}

export default async function PhotoPage({ params }) {
    const { id } = await params;
    const res = await fetch(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/api/photo?id=${id}`, { cache: 'no-store' });

    const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
        <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
        </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

    const toBase64 = (str) =>
        typeof window === 'undefined'
            ? Buffer.from(str).toString('base64')
            : window.btoa(str)

    let data = null;
    if (res.ok) {
        try {
            data = await res.json();
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    } else {
        notFound();
    }
    let photoComponent = (<></>)




    if (data) {
        let camera = data.exifData.photo.camera ?? null
        let focalLength = null
        let shutter = null
        let aperture = null
        let iso = null

        for (const exif of data.exifData.photo.exif) {
            if (exif.label === 'Focal Length') {
                focalLength = exif.raw._content
            } else if (exif.label === 'Exposure') {
                shutter = exif.raw._content
            } else if (exif.label === 'Aperture') {
                aperture = exif.raw._content
            } else if (exif.label === 'ISO Speed') {
                iso = exif.raw._content
            }
        }

        let settings = null

        if (focalLength || shutter || aperture || iso) {
            settings = (
                <>  (
                    {focalLength && <span className='text-center'>{focalLength},&nbsp;</span>}
                    {shutter && <span className='text-center'>{shutter} sec,&nbsp;</span>}
                    {aperture && <span className='text-center'>f/{aperture},&nbsp;</span>}
                    {iso && <span className='text-center'>ISO {iso}</span>})
                </>
            );
        }

        let map = null

        if (data.lat && data.lon) {
            map = (
                <>
                    <p className='mt-12 mb-2 text-neutral-500 text-center text-sm'>{data.geoName}</p>
                    <PhotoInfoMap
                        lat={data.lat}
                        lon={data.lon}
                    />
                </>

            );
        }


        photoComponent = (
            <div>
                <div className="indv-photo-container">
                    <div className="indv-photo-inner-container">
                        {data.prev && <Link href={`/photo/${data.prev}`}><span className="material-symbols-outlined text-neutral-500">
                            arrow_back_ios
                        </span></Link>}
                        {data.next && <Link href={`/photo/${data.next}`}><span className="material-symbols-outlined text-neutral-500">
                            arrow_forward_ios
                        </span></Link>}
                        <Image
                            width={data.width}
                            height={data.height}
                            src={data.url}
                            alt="Photo"
                            draggable="false"
                            placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(data.width, data.height))}`}
                        />
                    </div>
                    <p className='text-center text-neutral-500 text-sm mt-2'>
                        {camera && <span className='text-center'>{camera}&nbsp;</span>}{settings}
                    </p>
                    {map}
                </div>
            </div>
        );
    }

    return (
        <>
            {photoComponent}
        </>
    )
}

