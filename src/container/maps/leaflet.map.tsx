import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-22.89, -43.18]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
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
    const retrieveItem = async() => {
        let vector: GaugeStation[] = []
        await retrieve('gauge_station', 0, 1000, 'title', undefined)
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
    }
    const remove = () => {
        toggleShow()
        map.removeLayer(markers)
    }
    
    return (
        <div className='groupbutton'>
            <button hidden={!show} onClick={retrieveItem}>{UriToScreenFormat('gauge')}</button>
            <button hidden={show} onClick={remove}>{UriToScreenFormat('remove')}</button>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
        </div>
    )
}