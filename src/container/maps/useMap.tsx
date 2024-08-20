import * as L from 'leaflet'
import { useState } from "react"
import { Point } from "../../component/point"
import { addPolygon } from './addItem'

export const useMap = () => {
    const [ show1, setShow1 ] = useState<boolean>(false)
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    // const [, setOverlay ] = useState<L.ImageOverlay>()
    // const [ overlays ] = useState<L.ImageOverlay[]>([])
    const [ polygon1, setPolygon1 ] = useState<L.Polygon>()

    const addOnMap1 = (map: L.Map, points: Point[]) => {
        setShow1(!show1)
        let list:[number, number][] = []
        points.forEach((point:Point)=>{
            list.push([point.coordinates[1], point.coordinates[0]])
        })
        setPolygon1(addPolygon(map, L.polygon(list, {color: 'red'})))
    }
    const removeOnMap1 = (map: L.Map, element: any) => {
        setShow1(!show1)
        map.removeLayer(element)
    }
    const addPointList1 = (map: L.Map, vector: Point[]) => {
        setShow1(!show1)
        let featureGroup: L.FeatureGroup = L.featureGroup()
        vector.forEach((element: Point)=>{
            featureGroup.addLayer(L.marker([element.coordinates[1], element.coordinates[0]]).bindPopup(element.type))
        })
        map.addLayer(featureGroup)
        map.fitBounds(featureGroup.getBounds())
        setMarkers(featureGroup)
        return featureGroup
    }
    return {
        show1,
        markers,
        polygon1,
        addOnMap1,
        removeOnMap1,
        addPointList1,
    }
}