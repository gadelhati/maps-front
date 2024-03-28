import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [40.799311, -74.118464]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    const [ overlay, setOverlay ] = useState<L.ImageOverlay>()
    const [ show, setShow ] = useState<boolean>(true)
    const [ tile, setTile ] = useState<boolean>(true)

    useEffect(()=>{
        let base = L.map('map').setView(center, 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(base)
        setMap(base)
        return () => {
            base.remove()
        }
    }, [])
    const toggleShow = () => {
        setShow(!show)
    }
    const toggleTile = (base: any) => {
        setTile(!tile)
        if (tile) {
            return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(base)
        } else {
            return L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
            }).addTo(base)
        }
    }
    const retrieveItem = async(url: string) => {
        let vector: GaugeStation[] = []
        await retrieve(url, 0, 1000, 'title', undefined)
            .then((data: any) => {
                vector = data.content
            });
        add(vector)
    }
    const add = (vector: GaugeStation[]) => {
        toggleShow()
        let layerGroup: L.LayerGroup = L.layerGroup()
        vector.forEach((element: GaugeStation)=>{
            layerGroup.addLayer(L.marker(element.point.coordinates.slice(0).reverse()).bindPopup(element.title))
        })
        if(!map.hasLayer(layerGroup)) { setMap(map.addLayer(layerGroup)) }
        setMarkers(layerGroup)
        map.fitBounds(layerGroup.getBounds());
    }
    const remove = () => {
        toggleShow()
        map.removeLayer(markers)
    }
    const overlayImage = () => {
        var polygon = L.imageOverlay('/public/chart/25110.png', L.latLngBounds([[-60.75, -53.5], [-62.08, -57.75]]), {
            opacity: 0.6,
            errorOverlayUrl: 'https://cdn-icons-png.flaticon.com/512/110/110686.png',
            alt: 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.',
            interactive: true
        }).addTo(map)
        map.fitBounds(polygon.getBounds());
    }
    const addPolygon = () => {
        var polygon = L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'}).addTo(map);
        if(!map.hasLayer(polygon)) { setMap(map.addLayer(polygon)) }
        map.fitBounds(polygon.getBounds());
    }
    return (
        <div className='groupbutton'>
            <button hidden={!show} onClick={()=>retrieveItem('gauge_station')}>{UriToScreenFormat('gauge')}</button>
            <button hidden={show} onClick={remove}>{UriToScreenFormat('remove')}</button>
            <button onClick={overlayImage}>{UriToScreenFormat('overlay')}</button>
            <button onClick={addPolygon}>{UriToScreenFormat('polygon')}</button>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
        </div>
    )
}