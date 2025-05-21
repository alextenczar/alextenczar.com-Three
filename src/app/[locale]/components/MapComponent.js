'use client'

import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import React, { Suspense } from 'react'
import { useEffect, useRef } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
const MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;

const Map = (props) => {

    let mapRef = useRef()

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setView([props.lat, props.lon]);
        }
    }, [props.lat, props.lon]);

    let mapUrl = "https://api.maptiler.com/maps/jp-mierune-streets/256/{z}/{x}/{y}@2x.png?key=" + MAP_KEY

    return (
        <MapContainer preferCanvas={true} center={[props.lat, props.lon]} zoom={6} scrollWheelZoom={false} ref={mapRef}>
            <TileLayer
                url={mapUrl}
            />
            <Marker position={[props.lat, props.lon]} icon={new Icon({ iconUrl: "/marker-icon-2x.png", iconSize: [25, 41], iconAnchor: [12, 41] })} />
        </MapContainer>
    );
}

export default Map

