import * as L from 'leaflet'
import { useState } from "react"

export const useMap = () => {
    const [ features, setFeatures ] = useState<L.FeatureGroup[]>([])

    const addPolygon = (points: L.LatLng[]): L.FeatureGroup => {
        let polygon: L.Polygon[] = [L.polygon(points.map(p=>[p.lat, p.lng]))]
        return addFeature(polygon)
    }
    const addFeature = (points: Array<L.Marker | L.Polygon>): L.FeatureGroup => {
        const featureGroup = L.featureGroup();
        points.forEach(p => featureGroup.addLayer(p));
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
        addFeature,
        addPolygon,
        addOverlay,
        showFromMap,
        hideFromMap,
    }
}