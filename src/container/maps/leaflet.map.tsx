import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';
import { addFeatureGroup as addLayerGroup, addOverlay, addPolygon } from './addItem';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-23, -43]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    const [ overlay, setOverlay ] = useState<L.ImageOverlay>()
    const [ polygon, setPolygon ] = useState<L.Polygon>()
    const [ show, setShow ] = useState<boolean[]>([true, true, true])
    const [ tile, setTile ] = useState<boolean>(true)

    useEffect(()=>{
        let base = L.map('map').setView(center, 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 8,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(base)
        setMap(base)
        return () => {
            base.remove()
        }
    }, [])
    const toggleShow = (index: number) => {
        let value = show.slice()
        value[index] = !show[index]
        setShow(value)
    }
    // const toggleTile = (base: any) => {
    //     setTile(!tile)
    //     if (tile) {
    //         return L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //             maxZoom: 19,
    //             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //         }).addTo(base)
    //     } else {
    //         return L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    //             maxZoom: 19,
    //             attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
    //         }).addTo(base)
    //     }
    // }
    const retrieveItem = async(url: string) => {
        let vector: GaugeStation[] = []
        await retrieve(url, 0, 1000, 'title', undefined)
            .then((data: any) => {
                vector = data.content
            });
        itemMarkers(vector)
    }
    const itemMarkers = (vector: GaugeStation[]) => {
        toggleShow(0)
        setMarkers(addLayerGroup(map, vector))
    }
    const itemOverlay = () => {
        toggleShow(1)
        setOverlay(addOverlay(map))
    }
    const itemPolygon = () => {
        toggleShow(2)
        setPolygon(addPolygon(map))
    }
    const remove = (index: number, element: any) => {
        toggleShow(index)
        map.removeLayer(element)
    }
    return (
        <div className='groupbutton'>
            <button hidden={!show[0]} onClick={()=>retrieveItem('gauge_station')}>{UriToScreenFormat('gauge')}{show[0]}</button>
            <button hidden={show[0]} onClick={()=>remove(0, markers)}>{UriToScreenFormat('rm gauge')}{show[0]}</button>
            <button hidden={!show[1]} onClick={itemOverlay}>{UriToScreenFormat('overlay')}{show[1]}</button>
            <button hidden={show[1]} onClick={()=>remove(1, overlay)}>{UriToScreenFormat('rm overlay')}{show[1]}</button>
            <button hidden={!show[2]} onClick={itemPolygon}>{UriToScreenFormat('polygon')}{show[2]}</button>
            <button hidden={show[2]} onClick={()=>remove(2, polygon)}>{UriToScreenFormat('rm polygon')}{show[2]}</button>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
        </div>
    )
}