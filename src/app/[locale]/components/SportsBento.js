
'use client';
import { useState } from 'react';

export default function SportsBento(props) {
    const [selectedSport, setSelectedSport] = useState('snowboarding');

    const handleSportClick = (sport) => {
        setSelectedSport(sport);
    };

    return (
        <div className='bento observe-scroll bento-sports row-span-1 min-h-80'>
            <h2 className='text-4xl font-bold'>{props.title}</h2>
            <h3 className='text-lg !text-neutral-100'>{props.subtitle}</h3>
            <div className='bento-button-container'>
                <button aria-label="Snowboarding"
                    className='bento-button material-symbols-outlined text-black bg-white p-1'
                    onClick={() => handleSportClick('snowboarding')}
                >
                    snowboarding
                </button>
                <button aria-label="Running"
                    className='bento-button material-symbols-outlined text-black bg-white p-1'
                    onClick={() => handleSportClick('running')}
                >
                    directions_run
                </button>
            </div>

            <div className='video-mask'></div>
            {selectedSport === 'snowboarding' && (
                <video autoPlay muted loop playsInline className="snowboard-video" poster='/snowboard-poster.webp'>
                    <source src="/snowboard.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
            {selectedSport === 'running' && (
                <video autoPlay muted loop playsInline className="running-video" poster='/running-poster.webp'>
                    <source src="/running.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
}