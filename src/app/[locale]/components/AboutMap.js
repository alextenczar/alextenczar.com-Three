'use client'

import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('./MapComponent'), {
    ssr: false,
})

export default function AboutMap({ lat, lon }) {
    const [mapVar, setMapVar] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMapVar(
                <div className='map-container md:row-span-2 max-sm:row-span md:h-96 min-h-96 bento observe-scroll'>
                    <Map lat={lat} lon={lon} />
                </div>
            );
        }
    }, [lat, lon]);

    return <>{mapVar}</>;
}
