import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';

export const LeafletTemplateMap = () => {
    const center: L.LatLngExpression = [-22.89, -43.18]
    const [ mapa, setMapa ] = useState<any>()
    const [ marker, setMarker ] = useState<any>()
    const [ show, setShow ] = useState<boolean>(true)

    useEffect(()=>{
        let map = L.map('map').setView(center, 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map)
        setMapa(map)
        return () => {
            map.remove()
        }
    }, [])
    const toggleShow = () => {
        setShow(!show)
    }
    const retrieveItem = async() => {
        let vector: [] = []
        await retrieve('gauge_station', 0, 1000, 'title', undefined)
            .then((data: any) => {
                vector = data.content
            });
        add(vector)
    }
    const add = (vector: any[]) => {
        toggleShow()
        let markerVector: Object[] = []
        vector.forEach((element: any, index: number)=>{
            markerVector.push(L.marker([element.point.coordinates[1], element.point.coordinates[0]]).bindPopup(element.title))
            if(!mapa.hasLayer(markerVector[index])) { mapa.addLayer(markerVector[index]) }
        })
        setMarker(markerVector)
    }
    const remove = () => {
        toggleShow()
        marker.forEach((element:any, index:number) => {
            mapa.removeLayer(marker[index])
        })
    }
    
    return (
        <>
            <button hidden={!show} onClick={retrieveItem}>{UriToScreenFormat('gauge')}</button>
            <button hidden={show} onClick={remove}>{UriToScreenFormat('remove')}</button>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
        </>
    )
}