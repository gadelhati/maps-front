import * as L from 'leaflet'
import { useState } from "react"

export const useMap = (index: number) => {
    const [ show, setShow ] = useState<boolean[]>([true])
    const [ toggle, setToggle ] = useState<L.FeatureGroup>()
    const [ markers, setMarkers ] = useState<L.LayerGroup[]>([])
    const [ polygons, setPolygons ] = useState<L.Polygon[]>([])
    // const [, setOverlay ] = useState<L.ImageOverlay>()
    // const [ overlays ] = useState<L.ImageOverlay[]>([])

    const addPolygon = (map: L.Map, points: L.LatLng[]):L.Polygon => {
        setShow(prev => prev.map((val, i) => (i === index ? !val : val)))
        let list:[number, number][] = []
        points.forEach((point: L.LatLng)=>{
            list.push([point.lat, point.lng])
        })
        let polygon = L.polygon(list, {color: 'green'})
        showFromMap(map, polygon)
        setPolygons([...polygons.slice(0, index), polygon, ...polygons.slice(index + 1)])
        return polygon
    }
    const addMarkers = (map: L.Map, points: L.LatLng[]):L.FeatureGroup => {
        setShow(prev => prev.map((val, i) => (i === index ? !val : val)))
        let featureGroup: L.FeatureGroup = L.featureGroup()
        points.forEach((point: L.LatLng)=>{
            featureGroup.addLayer(L.marker([point.lat, point.lng]).bindPopup(point.toString()))
        })
        showFromMap(map, featureGroup)
        setMarkers([...markers.slice(0, index), featureGroup, ...markers.slice(index + 1)])
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
        setShow([...show.slice(0, index), !show[index], ...show.slice(index + 1)])
    }
    const toggleFromMap = (map: L.Map, element: L.FeatureGroup) => {
        map.addLayer(element)
        map.fitBounds(element.getBounds())
    }
    return {
        show,
        markers,
        polygons,
        addPolygon,
        addMarkers,
        addOverlay,
        showFromMap,
        hideFromMap,
    }
}