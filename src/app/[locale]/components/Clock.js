'use client'

import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import { Noto_Sans_Mono } from 'next/font/google'
const notoMono = Noto_Sans_Mono({ subsets: ['latin'] })

const Clock = ({ timezone, timeFormat }) => {

    let format = 'hh'
    let amPm = 'a'
    if (timeFormat === '24hr') {
        format = 'HH'
        amPm = ''
    }

    const [currentTime, setCurrentTime] = useState(DateTime.local().setZone(timezone));
    const utcOffset = currentTime.offset / 60; // Get the UTC offset in hours

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(DateTime.local().setZone(timezone));
        }, 1000);

        return () => clearInterval(interval);
    }, [timezone]);


    const formattedTime = currentTime.toFormat(`${format}:mm:ss ${amPm}`);

    // Format UTC offset in (UTC +/-HH:MM) format
    const formattedUtcOffset = utcOffset > 0 ? `+${String(utcOffset).padStart(2, '0')}` : String(utcOffset).padStart(2, '0');
    const formattedUtcString = `UTC${formattedUtcOffset}:00`;

    return (
        <div className={notoMono.className}>
            <span>
                <time dateTime={formattedTime} >
                    {formattedTime}
                </time>
                <br></br><span>{formattedUtcString}</span>
            </span>
        </div>
    );
};

export default Clock;