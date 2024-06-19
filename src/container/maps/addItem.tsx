import * as L from 'leaflet'
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';

export const addOverlay = (ne: any, sw: any, number: string) => {
    //ref.: vectorized in https://vectorization.eu/
    let path: string = '/public/chart/'.concat(number).concat('.svg')
    return L.imageOverlay(path, L.latLngBounds([ne, sw]), {
        opacity: 0.6,
        errorOverlayUrl: 'https://cdn-icons-png.flaticon.com/512/110/110686.png',
        alt: 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.',
        // interactive: true
    })
}

export const addPolygon = (map: L.Map) => {
    var polygon = L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'});
    map.addLayer(polygon)
    map.fitBounds(polygon.getBounds())
    return polygon
}

export const addFeatureGroup = (map: L.Map, vector: GaugeStation[]) => {
    let featureGroup: L.FeatureGroup = L.featureGroup()
    vector.forEach((element: GaugeStation)=>{
            featureGroup.addLayer(L.marker([element.point.coordinates[1], element.point.coordinates[0]]).bindPopup(element.title))
    })
    map.addLayer(featureGroup)
    map.fitBounds(featureGroup.getBounds())
    return featureGroup
}