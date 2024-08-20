import * as L from 'leaflet'
import { Point } from '../../component/point';

export const addOverlay = (ne: any, sw: any, number: string) => {
    //ref.: vectorized in https://vectorization.eu/
    let path: string = '/src/assets/image/chart/'.concat(number).concat('.svg')
    return L.imageOverlay(path, L.latLngBounds([ne, sw]), {
        opacity: 0.6,
        errorOverlayUrl: 'https://cdn-icons-png.flaticon.com/512/110/110686.png',
        alt: 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.',
        // interactive: true
    })
}

export const addPolygon = (map: L.Map, polygon: L.Polygon) => {
    map.addLayer(polygon)
    map.fitBounds(polygon.getBounds())
    return polygon
}

export const addPointList = (map: L.Map, vector: Point[]) => {
    let featureGroup: L.FeatureGroup = L.featureGroup()
    vector.forEach((element: Point)=>{
        featureGroup.addLayer(L.marker([element.coordinates[1], element.coordinates[0]]).bindPopup(element.type))
    })
    map.addLayer(featureGroup)
    map.fitBounds(featureGroup.getBounds())
    return featureGroup
}