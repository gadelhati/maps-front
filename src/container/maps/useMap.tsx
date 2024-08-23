import * as L from 'leaflet'
import { useState } from "react"
import { Point } from "../../component/point"

export const useMap = (index: number) => {
    const [ show, setshow ] = useState<boolean[]>([true])
    const [ markers, setMarkers ] = useState<L.LayerGroup[]>([])
    const [ polygons, setPolygons ] = useState<L.Polygon[]>([])
    // const [, setOverlay ] = useState<L.ImageOverlay>()
    // const [ overlays ] = useState<L.ImageOverlay[]>([])

    const addPolygon = (map: L.Map, points: Point[]):L.Polygon => {
        setshow([...show.slice(0, index), !show[index], ...show.slice(index + 1)])
        let list:[number, number][] = []
        points.forEach((point: Point)=>{
            list.push([point.coordinates[1], point.coordinates[0]])
        })
        let polygon = L.polygon(list)
        showFromMap(map, polygon)
        setPolygons([...polygons.slice(0, index), polygon, ...polygons.slice(index + 1)])
        return polygon
    }   
    const addMarkers = (map: L.Map, points: Point[]):L.FeatureGroup => {
        setshow([...show.slice(0, index), !show[index], ...show.slice(index + 1)])
        let featureGroup: L.FeatureGroup = L.featureGroup()
        points.forEach((element: Point)=>{
            featureGroup.addLayer(L.marker([element.coordinates[1], element.coordinates[0]]).bindPopup(element.type))
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
        setshow([...show.slice(0, index), !show[index], ...show.slice(index + 1)])
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