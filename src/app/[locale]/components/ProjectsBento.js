'use client';

import { useRef } from 'react';
import '../projectsbento.scss';
import { useEffect } from 'react';

export default function ProjectsBento(props) {

    useEffect(() => {
        const bentoElement = document.querySelector('.bento-projects');

        const handleMouseEnter = () => {
            const video = bentoElement.querySelector('.projects-video');
            if (video) {
                video.play();
            }
        };

        const handleMouseLeave = () => {
            const video = bentoElement.querySelector('.projects-video');
            if (video) {
                video.pause();
            }
        };

        if (bentoElement) {
            bentoElement.querySelector('.projects-video').pause();
            bentoElement.addEventListener('mouseenter', handleMouseEnter);
            bentoElement.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (bentoElement) {
                bentoElement.removeEventListener('mouseenter', handleMouseEnter);
                bentoElement.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div className='bento observe-scroll bento-projects row-span-1 max-md:min-h-64'>
            <h2 className='text-4xl font-bold'>{props.title}</h2>
            <h3 className='text-lg text-neutral-500'>{props.subtitle}</h3>

            <video autoPlay muted loop className="projects-video">
                <source src="/nutrition-tufts-edu.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}