import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import Link from 'next/link';


export default async function SignIn() {
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();

    if (session) {
        redirect('/');
    }

    const csrfTokenCookie = `${process.env.NODE_ENV == 'production' ? '__Host-' : ''
        }next-auth.csrf-token`;
    const csrfToken = cookieStore.get(csrfTokenCookie)?.value.split('|')[0];

    return (
        <main className="flex flex-col max-w-7xl w-full mx-auto px-9 " >
            <h1 className="text-6xl font-bold mt-0">Works</h1>

            <div className="flex items-center justify-center sm:mt-48 mt-16">
                <div className="!max-w-7xl w-full px-10 mx-auto ">
                    <h2 className="text-center text-3xl font-bold mb-2 mt-8 sm:mt-0">My Portfolio Is Private</h2>
                    <h3 className="text-center text-2xl font-semi-bold mb-8">Access is available upon request. Please <Link className="!hover:underline" href="/contact">get in touch</Link> for credentials.</h3>
                    <form method="post" action="/api/auth/callback/credentials" className='max-w-xl mx-auto flex flex-col'>
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <label htmlFor="form-name" className="sr-only">
                            Password
                        </label>
                        <input name="password" type="password" className="border-2 border-solid w-full text-2xl text-center p-4" placeholder="Enter Password" />
                        <button className="hover:scale-105 transition-all duration-300 text-center mx-auto mt-4 justify-self-center px-8 py-4 bg-black text-white rounded-4xl text-xl" type="submit">Sign in</button>
                    </form>
                </div>
            </div>
        </main >
    );
}

