import { Link } from '@/i18n/navigation';
import Image from "next/image";

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

const PostCard = ({ post, path }) => {

    return (
        <Link href={`/${path}/${post.slug}`}>
            <div>
                <div className="post-card observe-scroll flex flex-col rounded-[18px] shadow-lg overflow-hidden border border-neutral-200">
                    <div className="flex-shrink-0 relative">
                        <Image className="w-full max-h-[500px] object-cover object-top" src={post.cover.url} alt="" width={1920} height={1080} placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`} />

                        <span className="block z-1 bottom-0 left-0 right-0 lg:p-10 md:p-6 px-4 py-2 bg-white/95">
                            <h2 className="lg:text-5xl/13 md:text-3xl text-xl font-semibold">{post.title}</h2>
                            <h3 className="lg:text-2xl md:text-xl text-md lg:mt-2 text-neutral-500">{post.description}</h3>
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard