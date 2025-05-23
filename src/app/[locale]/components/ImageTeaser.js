'use client'

import Image from "next/image"
import "../photo.scss"
import { useEffect } from "react"
import { useState } from "react"

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



export default function ImageTeaser() {

    let images = [
        '/cat.jpg',
        '/coast.jpg',
        '/checker.jpg',
        '/night.jpg'
    ]

    const [imageComponent, setImageComponent] = useState([])

    useEffect(() => {
        const shuffledImages = [...images].sort(() => Math.random() - 0.5)
        const component = shuffledImages.map((image, index) => (
            <div className="image-inner" key={index}>
                <div className="image-teaser-inner-container">
                    <Image
                        tabIndex={0}
                        src={image}
                        width={400}
                        height={200}
                        alt="test"
                        unoptimized={true}
                        priority={true}
                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 200))}`}
                    />
                </div>
            </div>
        ))
        setImageComponent(component)
    }, [])




    return (
        <div className='image-teaser-container'>
            {imageComponent}
        </div>
    )
}