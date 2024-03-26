import { useEffect } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';

export const LeafletMap = () => {

    useEffect(()=>{
        const map = L.map('map').setView([-22.85, -43.34], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        return () => {
            map.remove();
        };
    })
    return (
        <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
    )
}