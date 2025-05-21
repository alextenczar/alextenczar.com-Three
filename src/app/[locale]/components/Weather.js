'use client'

import useSWR from 'swr'
import { Noto_Sans_Mono } from 'next/font/google'
const notoMono = Noto_Sans_Mono({ subsets: ['latin'] })

export default function Weather({ lang, lat, lon, tempUnit }) {

    const fetcher = (...args) => fetch(...args).then((res) => res.json())
    let { data, error } = useSWR(`/api/weather?lat=${lat}&lon=${lon}`, fetcher)

    if (error) return
    if (!data) return <span className="loading"></span>
    data = data.response
    let temp = data.main.temp

    if (tempUnit === 'c') {
        temp = Math.round(temp - 273.15);
    } else if (tempUnit === 'f') {
        temp = Math.round(temp * 9 / 5 - 459.67);
    }
    let desc = data.weather[0].icon

    switch (desc) {
        case '01d':
        case '01n':
            if (lang === "ja") {
                desc = '晴れ'
            } else {
                desc = 'Clear'
            }
            break
        case '02d':
        case '02n':
            if (lang === "ja") {
                desc = "時々曇り"
            } else {
                desc = 'Partly Cloudy'
            }
            break
        case '03d':
        case '03n':
        case '04d':
        case '04n':
            if (lang === "ja") {
                desc = "曇り"
            } else {
                desc = 'Cloudy'
            }
            break
        case '09d':
        case '09n':
            if (lang === "ja") {
                desc = "時々雨"
            } else {
                desc = 'Showers'
            }

            break
        case '10d':
        case '10n':
            if (lang === "ja") {
                desc = "雨"
            } else {
                desc = 'Rain'
            }
            break
        case '11d':
        case '11n':
            if (lang === "ja") {
                desc = "雷"
            } else {
                desc = 'Thunderstorms'
            }
            break
        case '13d':
        case '13n':
            if (lang === "ja") {
                desc = "雪"
            } else {
                desc = 'Snow'
            }
            break
        case '50d':
        case '50n':
            if (lang === "ja") {
                desc = '霧'
            } else {
                desc = 'Fog'
            }
            break
        default:
            desc = data.weather[0].main
    }

    return (
        <span>
            <span className={notoMono.className}>
                {Math.round(temp)}</span>&deg;<span className='temp-unit'>{tempUnit}</span> {desc}
        </span>
    );
};