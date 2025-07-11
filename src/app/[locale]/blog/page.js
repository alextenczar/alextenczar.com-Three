import GetPosts from "../../lib/GetPosts.js";
import PostCard from "../components/PostCard.js";
import { getTranslations } from "next-intl/server";
import { Link } from '@/i18n/navigation';

export async function generateMetadata({ params }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Metadata' });

    return {
        title: t('blog.title'),
        description: t('blog.description'),
    };
}

export default async function Works({ params }) {
    const { locale } = await params;
    let postsRes = await GetPosts('blog', locale);


    return (
        <div className="min-h-screen">
            <main className="max-w-7xl mx-auto relative">
                <div className="h-full pb-16 px-a md:px-0 mx-auto">
                    <div className="flex items-start px-9 ">
                        <Link href="/blog"><h1 className="font-bold text-6xl text-center text-neutral-800 uppercase">Blog</h1></Link>
                    </div>
                    <div className="mt-6 px-9 mx-auto flex flex-col gap-5">
                        {locale === 'ja' && <p>❗️お知らせ：時間が足りないので全ポストが機械翻訳を使っています。すみません🙇</p>}
                        {postsRes.posts.map((post) => (
                            <PostCard key={post.id} post={post} path="blog" />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}