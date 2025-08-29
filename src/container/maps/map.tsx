import { ChangeEvent, useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './map.css'
import { useMap } from './useMap'

export const Map = () => {
    const [map, setMap] = useState<L.Map>()
    const [center, setCenter] = useState<L.LatLng>(L.latLng(-22.8, -43))
    const [zoom, setZoom] = useState<number>(11)

    const { features, addPolygon, addMarkers, addOverlay, showFromMap, hideFromMap } = useMap()

    useEffect(() => {
        if (map) return
        let mapAux = L.map('map').setView(center, zoom)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: 'map-tiles'
        }).addTo(mapAux)
        // mapAux.on("click", () => addMarkers(mapAux, [center]))
        setMap(mapAux)
        return () => {
            // mapAux.off("click")
            mapAux.remove()
        }
    }, [])
    const handleInputFile = async (event: ChangeEvent<HTMLInputElement>, map: L.Map): Promise<L.LatLng[]> => {
        const file = event.target.files?.[0]
        if (!file) return []
        try {
            const text: string = await file.text()
            const coords: L.LatLng[] = text
                .split(/\r?\n/) // separa linhas
                .map(line => line.trim()) // remove espaços em branco no início e fim da string
                .filter(line => line.length > 0) // ignora linhas vazias
                .map(line => {
                    const [lat, lng] = line.split(/\s+/).map(parseFloat) // separa lat e lng por espaço
                    return !isNaN(lat) && !isNaN(lng) ? L.latLng(lat, lng) : null
                })
                .filter((coord): coord is L.LatLng => coord !== null)
            showFromMap(map, addMarkers(coords))
            // showFromMap(map, addPolygon(coords))
            return coords
        } catch (error) {
            return []
        }
    }
    return (
        <>
            <div id='map'></div>
            <nav className="feat">
                {features.map((layer: L.FeatureGroup, index: number) => (
                    <div key={index}>
                        {`Layer ${index + 1}`}
                        <button onClick={() => map && hideFromMap(map, layer)}>✖</button>
                    </div>
                ))}
                <input
                    type="file"
                    id="inputFile"
                    onChange={(e) => map && handleInputFile(e, map)}
                />
            </nav>
        </>
    )
}