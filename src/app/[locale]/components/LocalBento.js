'use client';
import dynamic from 'next/dynamic';
import AboutMap from './AboutMap';

const Clock = dynamic(() => import('./Clock'), {
    loading: () => <p>Loading Clock...</p>
});

import Weather from './Weather';
import { useEffect, useState } from 'react';

export default function LocalBento(props) {
    // const router = useRouter();
    // const pathname = usePathname();
    // const searchParams = useSearchParams()
    const [location, setLoc] = useState('residing');
    const [tempUnit, setTempUnit] = useState('f')
    const [timeFormat, setTimeFormat] = useState('12hr')


    let local = props.residingLocation
    let headerString = props.residing
    let clockTimeZone = "Asia/Tokyo"
    let weatherLat = '36.56132540'
    let weatherLon = '136.65620510'
    let sisterLocal = props.originLocation

    if (location === 'origin') {
        local = props.originLocation
        sisterLocal = props.residingLocation
        headerString = props.origin
        clockTimeZone = "America/New_York"
        weatherLat = '43.2070'
        weatherLon = '-71.5371'
    }

    useEffect(() => {
        if (props.lang === "ja") {
            setTempUnit("c")
            setTimeFormat("24hr")
        }
        let tempUnitStorage = localStorage.getItem("tempUnit") || ""
        let timeFormatStorage = localStorage.getItem("timeFormat") || ""
        if (tempUnitStorage !== "") {
            setTempUnit(tempUnitStorage)
        }
        if (timeFormatStorage !== "") {
            setTimeFormat(timeFormatStorage)
        }
    }, [props.lang])



    return (
        <>
            <div className='bento observe-scroll !bg-linear-to-t !from-fuchsia-200 !to-rose-100 row-span-1 max-md:min-h-64'>
                <h2 className='text-4xl font-bold'>{headerString}</h2>
                <div className='bento-button-container'>
                    <button onClick={() => {
                        setLoc('origin')
                    }} className='bento-button material-symbols-outlined text-white bg-black p-1'>child_care</button>
                    <button onClick={() => {
                        setLoc('residing')
                    }} className='bento-button material-symbols-outlined text-white bg-black p-1'>mood</button>
                </div>
                <span className='text-2xl'>{local}</span>
                <span className='text-xl'><Clock timezone={clockTimeZone} timeFormat={timeFormat} /></span>
                <span className='text-xl'><Weather lang={props.lang} lat={weatherLat} lon={weatherLon} tempUnit={tempUnit} /></span>
            </div>
            <AboutMap lat={weatherLat} lon={weatherLon} />
        </>

    );
}

