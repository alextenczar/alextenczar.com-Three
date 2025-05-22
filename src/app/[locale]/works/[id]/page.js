import ReactMarkdown from "react-markdown";
import GetPosts from "../../../lib/GetPosts.js";
import GetSinglePost from "../../../lib/GetSinglePost.js";
import Image from "next/image";
import '../../../styles/post-styling.scss'
import { Link } from '@/i18n/navigation';
import { getTranslations } from "next-intl/server";

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

export async function generateStaticParams() {

    let postsRes = await GetPosts('projects');

    return postsRes.posts.map((post) => ({
        id: post.slug,
    }));
}

async function fetchPostData(id) {
    const p = await GetSinglePost(id, 'projects');

    if (!p) {
        throw new Error("Post not found");
    }

    return {
        markdown: p.post.markdown.parent,
        post: p.post.post,
    };
}

function LinkRenderer(props) {
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

export async function generateMetadata({ params }) {
    const { post } = await fetchPostData(params.id);
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: post.title + " | " + t("title"),
        description: post.description
    }
}

export default async function Post({ params }) {
    const { markdown, post } = await fetchPostData(params.id);
    const { locale } = await params;

    let siteLink = null

    if (post.properties.URL.url) {
        siteLink = post.properties.URL.url
    }

    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto relative">
                <div className="flex items-center justify-center">
                    <article className="!max-w-7xl w-full px-10 mx-auto ">
                        <h1 className="font-bold md:text-5xl text-4xl mb-4">{post.title}</h1>
                        <h3 className="lg:text-2xl md:text-xl text-md !mt-2 text-neutral-500">{post.description}</h3>
                        {locale === 'ja' && <p className="my-4">❗️お知らせ：時間が足りないので全ポストが機械翻訳を使っています。すみません🙇</p>}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
                            <div className="p-4 border border-neutral-200 rounded-lg">
                                <h4 className="text-2xl">Role</h4>
                                {post.properties.Role && <h3 className="lg:text-xl md:text-xl text-md lg:mt-2">{post.properties.Role.rich_text[0].plain_text}</h3>}
                            </div>
                            <div className="p-4 border border-neutral-200 rounded-lg">
                                <h4 className="text-2xl">Responsibilites</h4>
                                {post.properties.Responsibilities && <h3 className="lg:text-xl md:text-xl text-md lg:mt-2">{post.properties.Responsibilities.rich_text[0].plain_text}</h3>}
                            </div>
                            <div className="p-4 border border-neutral-200 rounded-lg">
                                <h4 className="text-2xl">Technologies</h4>
                                {post.properties.Technologies && <h3 className="lg:text-xl md:text-xl text-md lg:mt-2">{post.properties.Technologies.rich_text[0].plain_text}</h3>}
                            </div>
                        </div>
                        <Image className="w-full object-fill rounded-xl shadow-lg overflow-hidden border border-neutral-200" src={post.cover.url} alt="" width={1920} height={1080} placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`} />
                        <div className="post-content prose !max-w-4xl mt-10 mx-auto">
                            <ReactMarkdown components={{ a: LinkRenderer }}>{markdown}</ReactMarkdown>
                            {siteLink && (
                                <div className="flex flex-col mx-auto gap-2 align-middle justify-center text-center">
                                    <h4 className="text-lg md:text-3xl sm:text-xl font-bold">Check It Out</h4>
                                    <Link aria-label="Site Link" href={siteLink} className="bg-neutral-800 !text-white rounded-4xl py-4 px-8 text-lg sm:text-xl font-bold inline-block mx-auto hover:scale-105" target="_blank">{siteLink}</Link>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </main>
        </div>
    );
}

