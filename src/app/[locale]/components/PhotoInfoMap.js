'use client'

import React from 'react'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('@/app/[locale]/components/MapComponent', {
    ssr: false,
}))

export default function PhotoInfoMap({ lat, lon }) {

    const [mapVar, setMapVar] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMapVar(
                <div className='map-container md:h-128 h-96 md:w-128 max-w-96 w-full aspect-square z-0'>
                    <Map lat={lat} lon={lon} />
                </div>
            );
        }
    }, [lat, lon]);

    return <>{mapVar}</>;
}

