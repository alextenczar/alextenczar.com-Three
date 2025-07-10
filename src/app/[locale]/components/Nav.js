"use client";

import { Link } from '@/i18n/navigation';
import Options from './Options';
import { usePathname, useRouter } from '@/i18n/navigation';
import { usePathname as useNextPathname } from 'next/navigation';
import { useState, useEffect, useCallback, Suspense, use } from 'react';

const Nav = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const nextPathname = useNextPathname()
    const router = useRouter();

    useEffect(() => {
        if (isMenuOpen) {
            const scrollTop = window.scrollY;
            document.body.style.top = `-${scrollTop}px`;
            document.body.style.position = 'fixed';
            document.body.style.left = '0';
            document.body.style.right = '0';
            document.body.style.overflow = 'hidden';
            document.body.classList.add('menu-open');
        } else {
            let scrollTop = parseInt(document.body.style.top) * -1;
            document.body.style.top = ``;
            document.body.style.position = '';
            document.body.style.left = '';
            document.body.style.right = '';
            document.body.style.overflow = '';
            document.body.classList.remove('menu-open');
            window.scrollTo({ left: 0, top: scrollTop, behavior: "instant" })
        }

        return () => {
        };
    }, [pathname, isMenuOpen]);

    useEffect(() => {
        document.body.classList.remove('menu-open');
        setIsMenuOpen(false);
    }, [pathname]);

    const menuStateHandler = (data) => {
        setIsMenuOpen(data)
    }

    return (
        <>
            <nav
                className="mt-4 z-2 w-full px-10 py-5 max-w-[1280px] m-auto mb-0 transition-all"
            >
                <div
                    className='mobile-menu list-none flex flex-col gap-4 m-0 p-5 fixed inset-0 bg-white justify-center items-end z-10 invisible opacity-0'
                    style={{ visibility: 'hidden', opacity: 0 }}
                >
                    <p className='absolute top-4 left-[50%] transform-[translateX(-50%)] z-11 lg:text-5xl text-3xl w-full px-10 py-3 max-w-[1280px] m-auto font-extrabold'>
                        <Link aria-label="Home" href='/' >Alex Tenczar</Link>
                    </p>
                    <ul className="lg:text-8xl sm:text-7xl text-4xl text-right mt-24">
                        <li>
                            <Link aria-label="About" href="/" className="no-underline !font-extrabold">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Works" href="/works" className="no-underline !font-extrabold">
                                Works
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Blog" href="/blog" className="no-underline !font-extrabold">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Photo" href="/photo" className="no-underline !font-extrabold">
                                Photo
                            </Link>
                        </li>
                        <li>
                            <Link aria-label="Contract" href="/contact" className="no-underline !font-extrabold">
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className=' mt-auto mb-4 flex flex-col sm:gap-6 gap-4'>
                        <div className='mb-4'>
                            <p className='text-right lg:text-2xl text-xl'>
                                {props.settingsTitle}
                            </p>
                            <div className='text-right lg:text-2xl text-xl'>
                                <span className="text-base text-neutral-500">{props.languageLabel}</span>
                                <div className='!lg:text-4xl !text-2xl'>
                                    <button aria-label="English" className='font-bold' onClick={() => {
                                        if (pathname.startsWith('/blog/')) {
                                            router.replace('/blog', { locale: 'en' });
                                        } else if (pathname.startsWith('/works/')) {
                                            router.replace('/works', { locale: 'en' });
                                        } else {
                                            router.replace(pathname, { locale: 'en' });
                                        }
                                    }}>English</button>&nbsp;
                                    <button aria-label="日本語" className='font-bold' onClick={() => {
                                        if (pathname.startsWith('/blog/')) {
                                            router.replace('/blog', { locale: 'ja' });
                                        } else if (pathname.startsWith('/works/')) {
                                            router.replace('/works', { locale: 'ja' });
                                        } else {
                                            router.replace(pathname, { locale: 'ja' });
                                        }
                                    }}>日本語</button>
                                    <Suspense><Options setMenuState={menuStateHandler} languageLabel={props.languageLabel} tempLabel={props.tempLabel} timeLabel={props.timeLabel} /></Suspense>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className='text-right text-2xl'>
                                {props.socialsTitle}
                            </p>
                            <ul className='lg:text-4xl text-2xl flex flex-row gap-4 !font-extrabold'>
                                <li><Link aria-label="Github" href="https://github.com/alextenczar" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
                                <li><Link aria-label="LinkedIn" href="https://www.linkedin.com/in/alexander-tenczar/" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
                                <li><Link aria-label="Wantedly" href="https://www.wantedly.com/id/alexander_tenczar" target="_blank" rel="noopener noreferrer">Wantedly</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {(nextPathname !== '/ja' && nextPathname !== '/en') && (
                    <div className="flex items-center justify-between">
                        <Link aria-label="Home" href="/" className="text-xl font-bold">Alex Tenczar</Link>
                    </div>
                )}
            </nav>
            <button aria-label="Menu"
                className="text-2xl nav-hamburger"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <span className="material-symbols-outlined">
                    {isMenuOpen ? 'close' : 'menu'}
                </span>
            </button>
        </>
    );
};


export default Nav;