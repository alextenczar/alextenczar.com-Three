"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation'


export const IntersectionTools = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    useEffect(() => {
        setTimeout(() => {
            if (typeof window === 'undefined') return;

            const elements = document.querySelectorAll('.observe-scroll, .prose > *');

            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.125
            };

            function observerCallback(entries) {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('in-view');
                        }, index * 150); // 150ms delay per entry
                    }
                });
            }

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            elements.forEach((element) => observer.observe(element));


            return () => {
                observer.disconnect();
            };
        }, 1)




    }, [pathname, searchParams]);

    return <></>;
};

