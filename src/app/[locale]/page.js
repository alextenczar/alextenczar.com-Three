import styles from './page.module.css'
import ImageTeaser from './components/ImageTeaser';
import { Link } from '@/i18n/navigation';
import SportsBento from './components/SportsBento';
import LocalBento from './components/LocalBento';
import TechnicalSkills from './components/TechnicalSkills';
import BlogBento from './components/BlogBento';
import ProjectsBento from './components/ProjectsBento';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { use } from 'react';





export default function Home({ params }) {
  const { locale } = use(params);

  setRequestLocale(locale);

  const t = useTranslations('HomePage');

  return (
    <main className={styles.main}>
      <div className='max-w-3xl'>
        {locale === 'ja' && <span className='!mb-0 text-xl !font-bold fade-in-opacity animation-delay-400 opacity-0'>アレックス・テンザー</span>}
        <h1 className='font-bold text-6xl !mb-3 !mt-0 fade-in-opacity animation-delay-400 opacity-0'>{t('intro.name')}</h1>


        <div id="about" className='text-xl fade-in-opacity animation-delay-600 opacity-0'>
          <p>
            {t('intro.para')}
          </p>
        </div>
        <div>
        </div>

      </div>

      <br></br>

      <div className="grid md:grid-rows-6 md:grid-cols-2 gap-6">
        <LocalBento lang={locale} residing={t('location.residing')} residingLocation={t('location.residingLocation')} origin={t('location.origin')} originLocation={t('location.originLocation')} />
        <Link aria-label={t('works.title')} href="/works"><ProjectsBento title={t('works.title')} subtitle={t('works.subtitle')} /></Link>
        <div className='bento observe-scroll md:col-span-2'>
          <h2 className='text-4xl font-bold'>{t('education.title')}</h2>
          <h3 className='text-lg text-neutral-500'>{t('education.subtitle')}</h3>
          <div className="grid grid-cols-20 md:grid-rows-5 grid-rows-[auto] text-xs mt-6 education-timeline max-md:min-h-80">
            <div className="py-2 col-span-20 grid grid-cols-subgrid items-center"><div className="timeline-label px-2 col-start-11 col-span-9 rounded-full font-bold self-end">{t('education.launchtheory')}</div><Link aria-label="Launch Theory" href="https://launchtheory.com" target="_blank" className="timeline-item h-3 col-start-11 col-span-9 bg-purple-500 rounded-full">&nbsp;</Link></div>
            <div className="col-span-20 grid grid-cols-subgrid grid-rows-2 items-center"><div className="timeline-label px-2 col-start-9 col-span-11 rounded-full font-bold self-end">{t('education.internship')}</div><Link aria-label="CommonPlaces" href="https://commonplaces.com" target="_blank" className="timeline-item h-3 col-start-9 col-span-2 bg-green-500 rounded-full">&nbsp;</Link></div>
            <div className="col-span-20 grid grid-cols-subgrid items-center"><div className="timeline-label px-2 col-start-8 col-span-13 rounded-full font-bold self-end">{t('education.grad')}</div><Link aria-label="UNH" href="https://unh.edu" target='_blank' className="timeline-item  h-3 col-start-8 col-span-4 bg-orange-500 rounded-full">&nbsp;</Link></div>
            <div className="col-span-20 grid grid-cols-subgrid items-center"><div className="timeline-label px-2 col-start-2 col-span-20 rounded-full font-bold self-end">{t('education.undergrad')}</div><Link aria-label="UNH" href="https://unh.edu" target='_blank' className="timeline-item  h-3 col-start-2 col-span-8 bg-blue-500 rounded-full">&nbsp;</Link></div>
            <div className="py-2 col-span-20 grid grid-cols-subgrid text-gray-400 text-[11px] items-end"><div className="col-span-2">2016</div><div className="col-span-2">2017</div><div className="col-span-2">2018</div><div className="col-span-2">2019</div><div className="col-span-2">2020</div><div className="col-span-2">2021</div><div className="col-span-2">2022</div><div className="col-span-2">2023</div><div className="col-span-2">2024</div><div className="col-span-2">2025</div></div>
          </div>

        </div>

        <div className='bento observe-scroll flex flex-col max-md:min-h-80'>
          <h2 className='text-4xl font-bold'>{t('skills.title')}</h2>
          <h3 className='text-lg text-neutral-500'>{t('skills.subtitle')}</h3>
          <TechnicalSkills></TechnicalSkills>
        </div>

        <Link aria-label={t('blog.subtitle')} href="/blog"><BlogBento title={t('blog.title')} subtitle={t('blog.subtitle')} /></Link>

        <SportsBento title={t('sports.title')} subtitle={t('sports.subtitle')} />

        <Link aria-label={t('photography.title')} href="/photo">
          <div className='bento-photo bento observe-scroll row-span-1 max-md:min-h-64'>
            <h2 className='text-4xl font-bold'>{t('photography.title')}</h2>
            <h3 className='text-lg text-neutral-500'>{t('photography.subtitle')}</h3>
            <ImageTeaser />
          </div>
        </Link>

        <div className='bento bento-contact observe-scroll row-span-1 md:col-span-2 max-md:min-h-64'>
          <h2 className='text-4xl font-bold'>{t('contact.title')}</h2>
          <h3 className='text-lg text-neutral-500'>{t('contact.subtitle')}</h3>

          <div className='bento-contact-container grid grid-cols-4'>
            <Link aria-label="GitHub" href="https://github.com/alextenczar" target="_blank" rel="noopener noreferrer" className="github-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
            </Link>
            <Link aria-label="LinkedIn" href="https://www.linkedin.com/in/alexander-tenczar/" target="_blank" rel="noopener noreferrer" className="linkedin-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
            </Link>
            <Link aria-label="Wantedly" href="https://www.wantedly.com/id/alexander_tenczar" target="_blank" rel="noopener noreferrer" className="wantedly-link">
              <svg id="Logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 394"><defs></defs><circle className="cls-1" cx="375" cy="122.95" r="38.98" fill="#21bddb" /><path className="cls-2" fill="#282828" fillRule="evenodd" d="M217.17,234.77c-2.34-1.52-9-10.45-27.42-54.44-1.15-2.76-2.22-5.14-3.23-7.18l-3.77-9.08L150.47,86.12H85.89l32.29,77.95,32.29,78,29.82,72a2.68,2.68,0,0,0,4.94,0l32.45-77.68A1.34,1.34,0,0,0,217.17,234.77Z" /><path className="cls-2" d="M338.15,234.77c-2.34-1.52-9-10.45-27.42-54.44-1.15-2.76-2.23-5.14-3.24-7.19l-3.75-9.07L271.45,86.12H206.87l32.29,77.95,32.29,78,29.82,72a2.68,2.68,0,0,0,4.94,0l32.45-77.67A1.36,1.36,0,0,0,338.15,234.77Z" /></svg>
            </Link>
            <Link aria-label="Contact" href="/contact" target="_blank" rel="noopener noreferrer" className="email-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" /></svg>
            </Link>
          </div>
        </div>


      </div>
    </main >
  )
}
