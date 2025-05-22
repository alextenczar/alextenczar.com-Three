'use client'
import React from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';

const Footer = (props) => {


    const pathname = usePathname();
    const router = useRouter();

    let socialsTitle = "Socials"

    if (props.locale === "ja") {
        socialsTitle = "SNS"
    }

    return (
        <footer style={styles.footer} className="py-5 max-w-[1280px] m-auto !mt-auto md:p-8 p-4 text-neutral-700 !pt-24">
            <nav className="grid md:grid-cols-12 grid-cols-2 mb-8">
                <div style={{ marginTop: '1rem' }} className='flex-col md:col-span-6 '>
                    <h3 className=' mb-4 text-lg'>Menu</h3>
                    <ul className='text-2xl'>
                        <li><Link aria-label="About" href="/">About</Link></li>
                        <li><Link aria-label="Works" href="/works">Works</Link></li>
                        <li><Link aria-label="Blog" href="/blog">Blog</Link></li>
                        <li><Link aria-label="Photo" href="/photo">Photo</Link></li>
                        <li><Link aria-label="Contact" href="/contact">Contact</Link></li>
                    </ul>
                </div>

                <div style={{ marginTop: '1rem' }} className='flex-col md:col-span-4'>
                    <h3 className=' mb-4  text-lg'>{socialsTitle}</h3>
                    <ul className='text-2xl'>
                        <li><Link aria-label="Github" href="https://github.com/alextenczar" target="_blank" rel="noopener noreferrer">GitHub</Link></li>
                        <li><Link aria-label="LinkedIn" href="https://www.linkedin.com/in/alexander-tenczar/" target="_blank" rel="noopener noreferrer">LinkedIn</Link></li>
                        <li><Link aria-label="Wantedly" href="https://www.wantedly.com/id/alexander_tenczar" target="_blank" rel="noopener noreferrer">Wantedly</Link></li>
                    </ul>
                </div>
                <div style={{ marginTop: '1rem' }} className='flex-col md:col-span-2'>
                    <h3 className=' mb-4 text-lg'>Language</h3>
                    <ul className='text-2xl'>
                        <li><button aria-label="English" locale={'en'} className="font-semibold" onClick={() => {
                            router.replace(pathname, { locale: 'en' });
                        }}>English</button></li>
                        <li><button aria-label="日本語" locale={'en'} className="font-semibold" onClick={() => {
                            router.replace(pathname, { locale: 'ja' });
                        }}>日本語</button></li>
                    </ul>
                </div>
            </nav>
            <p className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl" style={styles.text}>© {new Date().getFullYear()} <Link aria-label="Home" href="/">Alex Tenczar</Link></p>
        </footer >
    );
};

const styles = {
    footer: {
        textAlign: 'left',
        width: '100%',
    },
};

export default Footer;