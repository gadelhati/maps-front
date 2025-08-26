import { ChangeEvent, useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './map.css'
import { useMap } from './useMap'

export const Map = () => {
    const [map, setMap] = useState<L.Map>()
    const [center, setCenter] = useState<L.LatLng>(L.latLng(-22.8, -43))
    const [zoom, setZoom] = useState<number>(11)

    // const { show, markers, polygons, addPolygon, addMarkers, addOverlay, hideFromMap } = useMap(0)

    useEffect(() => {
        if (map) return
        let mapAux = L.map('map').setView(center, zoom)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: 'map-tiles'
        }).addTo(mapAux)
        // mapAux.on("click", () => addMarkers(mapAux, [center]));
        setMap(mapAux)
        return () => {
            // mapAux.off("click")
            mapAux.remove()
        }
    }, [])
    const handleInputFile = async (event: ChangeEvent<HTMLInputElement>): Promise<L.LatLng[]> => {
        const file = event.target.files?.[0]
        if (!file) return []
        try {
            const text = await file.text()
            return text
                .split(/\r?\n/)
                .map(line => line.trim())
                .filter(line => line.length > 0)
                .map(line => {
                    const [lat, lng] = line.split(/\s+/).map(parseFloat)
                    return !isNaN(lat) && !isNaN(lng) ? L.latLng(lat, lng) : null
                })
                .filter((coord): coord is L.LatLng => coord !== null)
            // addMarkers(map, text)
        } catch {
            return []
        }
    }
    return (
        <>
        <nav>2234234234234</nav>
        <div id='map'>
            <input type="file" id='inputFile' onChange={handleInputFile} ></input>
        </div>
        </>
    )
}