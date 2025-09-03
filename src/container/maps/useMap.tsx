import * as L from 'leaflet'
import { useEffect, useState } from "react"

export const useMap = () => {
    const [ map, setMmap ] = useState<L.Map>()
    const [center, setCenter] = useState<L.LatLng>(L.latLng(-22.8, -43))
    const [zoom, setZoom] = useState<number>(11)
    const [ features, setFeatures ] = useState<L.FeatureGroup[]>([])

    useEffect(() => {
        if (map) return
        let mapAux = L.map('map').setView(center, zoom)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: 'map-tiles'
        }).addTo(mapAux)
        // mapAux.on("click", () => addMarkers(mapAux, [center]))
        setMmap(mapAux)
        return () => {
            // mapAux.off("click")
            mapAux.remove()
        }
    }, [])
    const addMarkers = (points: L.LatLng[]): L.FeatureGroup => {
        let markers: L.Marker[] = points.map(point => L.marker([point.lat, point.lng]))
        return addFeature(markers)
    }
    const addPolygon = (points: L.LatLng[]): L.FeatureGroup => {
        let polygon: L.Polygon[] = [L.polygon(points.map(point =>[point.lat, point.lng]))]
        return addFeature(polygon)
    }
    const addFeature = (points: Array<L.Marker | L.Polygon>): L.FeatureGroup => {
        const featureGroup = L.featureGroup();
        points.forEach(p => featureGroup.addLayer(p));
        setFeatures(prev => [...prev, featureGroup])
        return featureGroup;
    }
    const addOverlay = (ne: any, sw: any, number: string) => {
        //ref.: vectorized in https://vectorization.eu/
        let path: string = '/src/assets/image/chart/'.concat(number).concat('.svg')
        return L.imageOverlay(path, L.latLngBounds([ne, sw]), {
            opacity: 0.6,
            errorOverlayUrl: 'https://cdn-icons-png.flaticon.com/512/110/110686.png',
            alt: 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.',
            // interactive: true
        })
    }
    const toggleFromMap = (map: L.Map, element: L.FeatureGroup) => {
        if (map.hasLayer(element)) {
            map.removeLayer(element)
            setFeatures(prev => prev.filter(f => f !== element))
        } else {
            map.addLayer(element)
            map.fitBounds(element.getBounds())
        }
    }
    return {
        map,
        features,
        addFeature,
        addMarkers,
        addPolygon,
        addOverlay,
        toggleFromMap,
    }
}