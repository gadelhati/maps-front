import * as L from 'leaflet'
import { useState } from "react"
import { Point } from "../../component/point"

export const useMap = () => {
    const [ show1, setShow1 ] = useState<boolean>(true)
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    // const [, setOverlay ] = useState<L.ImageOverlay>()
    // const [ overlays ] = useState<L.ImageOverlay[]>([])
    const [ polygons, setPolygons ] = useState<L.Polygon>()

    const addOnMap1 = (map: L.Map, points: Point[]) => {
        setShow1(!show1)
        let list:[number, number][] = []
        points.forEach((point: Point)=>{
            list.push([point.coordinates[1], point.coordinates[0]])
        })
        let polygon = L.polygon(list)
        showFromMap(map, polygon)
        setPolygons(polygon)
    }   
    const addPointList1 = (map: L.Map, points: Point[]) => {
        setShow1(!show1)
        let featureGroup: L.FeatureGroup = L.featureGroup()
        points.forEach((element: Point)=>{
            featureGroup.addLayer(L.marker([element.coordinates[1], element.coordinates[0]]).bindPopup(element.type))
        })
        showFromMap(map, featureGroup)
        setMarkers(featureGroup)
    }
    const showFromMap = (map: L.Map, element: any) => {
        map.addLayer(element)
        map.fitBounds(element.getBounds())
    }
    const hideFromMap = (map: L.Map, element: any) => {
        map.removeLayer(element)
        setShow1(!show1)
    }
    return {
        show1,
        markers,
        polygons,
        addOnMap1,
        addPointList1,
        hideFromMap,
    }
}