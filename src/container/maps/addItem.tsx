import * as L from 'leaflet'
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';

export const addOverlay = (map: L.Map) => {
    var item = L.imageOverlay('/public/chart/25110.png', L.latLngBounds([[-60.75, -53.5], [-62.08, -57.75]]), {
        opacity: 0.6,
        errorOverlayUrl: 'https://cdn-icons-png.flaticon.com/512/110/110686.png',
        alt: 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.',
        interactive: true
    })
    map.addLayer(item)
    map.fitBounds(item.getBounds());
    return item
}

export const addPolygon = (map: L.Map) => {
    var polygon = L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'});
    map.addLayer(polygon)
    map.fitBounds(polygon.getBounds());
    return polygon
}

export const addFeatureGroup = (map: L.Map, vector: GaugeStation[]) => {
    let featureGroup: L.FeatureGroup = L.featureGroup()
    vector.forEach((element: GaugeStation)=>{
            // featureGroup.addLayer(L.marker(element.point.coordinates.slice(0).reverse()).bindPopup(element.title))
            featureGroup.addLayer(L.marker(element.point.coordinates.slice(0).reverse()).bindPopup(element.title))
    })
    map.addLayer(featureGroup)
    map.fitBounds(featureGroup.getBounds());
    return featureGroup
}