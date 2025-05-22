"use client";

import Lenis from "lenis";
import { useEffect } from "react";


export const ScrollTools = () => {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const lenis = new Lenis({
            duration: 1.5,
            touchMultiplier: 1.5,
            wheelMultiplier: 1.5,
            smoothTouch: true,
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        const scrollToTopButton = document.createElement('button');
        scrollToTopButton.setAttribute('aria-label', 'Top');
        scrollToTopButton.className = 'scroll-to-top-button';

        document.body.appendChild(scrollToTopButton);

        scrollToTopButton.innerHTML = '<span class="material-symbols-outlined scroll-to-top">arrow_upward</span>';

        scrollToTopButton.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5 });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopButton.querySelector('.scroll-to-top').classList.add('visible');
            } else {
                scrollToTopButton.querySelector('.scroll-to-top').classList.remove('visible')
            }
        });

        return () => {
            lenis.destroy();
        };



    }, []);

    return <></>;
};

