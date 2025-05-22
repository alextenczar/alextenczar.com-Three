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
        scrollToTopButton.className = 'go-up-button';

        document.body.appendChild(scrollToTopButton);

        scrollToTopButton.innerHTML = '<span class="material-symbols-outlined go-up">arrow_upward</span>';

        scrollToTopButton.addEventListener('click', () => {
            lenis.scrollTo(0, { duration: 1.5 });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopButton.querySelector('.go-up').classList.add('visible');
            } else {
                scrollToTopButton.querySelector('.go-up').classList.remove('visible')
            }
        });

        return () => {
            lenis.destroy();
        };



    }, []);

    return <></>;
};

