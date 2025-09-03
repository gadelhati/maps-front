import { ChangeEvent } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './map.css'
import { useMap } from './useMap'

export const Map = () => {
    const { map, features, addFeature, addPolygon, addOverlay, toggleFromMap} = useMap()

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
            // showFromMap(map, addFeature(coords.map(point => L.marker([point.lat, point.lng]))))
            // showFromMap(map, addFeature([L.polygon(coords.map(p=>[p.lat, p.lng]))]))
            toggleFromMap(map, addPolygon(coords))
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
                        <button onClick={() => map && toggleFromMap(map, layer)}>✖</button>
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