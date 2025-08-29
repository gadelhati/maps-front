import * as L from 'leaflet'
import { useState } from "react"

export const useMap = () => {
    const [ features, setFeatures ] = useState<L.FeatureGroup[]>([])

    const addPolygon = (points: L.LatLng[]):L.FeatureGroup => {
        let list:[number, number][] = points.map(p=>[p.lat, p.lng])
        let polygon = L.polygon(list, {color: 'green'})
        const featureGroup: L.FeatureGroup = L.featureGroup([polygon])
        setFeatures(prev => [...prev, featureGroup])
        return featureGroup
    }
    const addMarkers = (points: L.LatLng[]):L.FeatureGroup => {
        const markers = points.map(point => L.marker([point.lat, point.lng]))
        const featureGroup: L.FeatureGroup = L.featureGroup(markers)
        setFeatures(prev => [...prev, featureGroup])
        return featureGroup
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
    const showFromMap = (map: L.Map, element: L.FeatureGroup | L.Polygon) => {
        map.addLayer(element)
        map.fitBounds(element.getBounds())
    }
    const hideFromMap = (map: L.Map, element: any) => {
        map.removeLayer(element)
        setFeatures(prev => prev.filter(f => f !== element))
    }
    return {
        features,
        addPolygon,
        addMarkers,
        addOverlay,
        showFromMap,
        hideFromMap,
    }
}