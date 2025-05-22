'use client'

import { Link } from '@/i18n/navigation'
import Image from "next/image"
import "../photo.scss"
import { useEffect } from "react"


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



export default function ImageGrid({ images }) {

    useEffect(() => {
        window.scrollTo(0, 0);

        document.querySelectorAll('.image-inner').forEach((element) => {
            element.addEventListener('click', () => handleClick(element));
        }
        );
    }, []);

    return (
        <div className='image-container'>
            {images.map((photo, index) => {
                let serverId = photo.server
                let id = photo.id
                let secret = photo.secret
                let sizeSuffix = "b"
                let priority = false
                if (index < 30) {
                    priority = true;
                }
                let url = `https://live.staticflickr.com/${serverId}/${id}_${secret}_${sizeSuffix}.jpg`
                return (
                    <div className={`image-inner`} key={index}>
                        <div className={`image-inner-container`}>
                            <Link aria-label={`Photo ${id}`} href={`photo/${id}`} target="_blank">
                                <Image
                                    tabIndex={0}
                                    src={url}
                                    width={400}
                                    height={200}
                                    alt='test'
                                    unoptimized={true}
                                    key={index}
                                    priority={true}
                                    placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 200))}`}
                                />
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div >
    )
}