import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

export interface MapPageProps { }

export const MapLeafleat = () => {
    const [position, setPosition] = useState<LatLngExpression>([-23.505, -43.09]);
    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}