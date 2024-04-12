import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';
import { addFeatureGroup , addOverlay, addPolygon } from './addItem';
import './leaflet.css'
import { Chart } from '../../component/chart/chart.interface';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-23, -43]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    const [ overlay, setOverlay ] = useState<L.ImageOverlay>()
    const [ overlays, setOverlays ] = useState<L.ImageOverlay[]>([])
    const [ charts, setCharts ] = useState<Chart[]>([])
    const [ polygon, setPolygon ] = useState<L.Polygon>()
    const [ show, setShow ] = useState<boolean[]>([true, true, true])
    const [ tile, setTile ] = useState<boolean>(true)
    let item: L.ImageOverlay

    useEffect(()=>{
        let base = L.map('map').setView(center, 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // maxZoom: 8,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(base)
        setMap(base)
        return () => {
            retrieveCharts('chart', 'number')
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
    const retrieveItem = async(url: string, sort: string) => {
        let vector: GaugeStation[] = []
        await retrieve(url, 0, 1000, sort, undefined)
            .then((data: any) => {
                vector = data.content
            });
        itemMarkers(vector)
    }
    const retrieveCharts = async(url: string, sort: string) => {
        await retrieve(url, 0, 1000, sort, undefined)
            .then((data: any) => {
                setCharts(data.content)
            });
    }
    const retrieveChart = async(index: number) => {
        toggleShow(1)
        if(overlays[index] !== undefined && map.hasLayer(overlays[index])){
            console.log('antes', overlays[index])
            map.removeLayer(overlays[index])
        } else {
            console.log('depois', overlays[index])
            overlays[index] = addOverlay(charts[index].ne.coordinates.slice(0), charts[index].sw.coordinates.slice(0))
            map.addLayer(overlays[index])
            map.fitBounds(overlays[index].getBounds())
            setOverlay(overlays[index])
        }
    }
    const itemMarkers = (vector: GaugeStation[]) => {
        toggleShow(0)
        setMarkers(addFeatureGroup(map, vector))
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
        <div>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
            <div className='menu'>
                <button hidden={!show[0]} onClick={()=>retrieveItem('gauge_station', 'title')}>{UriToScreenFormat('gauge')}{show[0]}</button>
                <button hidden={show[0]} onClick={()=>remove(0, markers)}>{UriToScreenFormat('rm gauge')}{show[0]}</button>
                <button onClick={()=>retrieveChart(0)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 0')}</button>
                {/* <button onClick={()=>retrieveChart(1)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 1')}</button> */}
                <button hidden={!show[2]} onClick={itemPolygon}>{UriToScreenFormat('polygon')}{show[2]}</button>
                <button hidden={show[2]} onClick={()=>remove(2, polygon)}>{UriToScreenFormat('rm polygon')}{show[2]}</button>
            </div>
            <div className='chart'>
                <li aria-disabled={!show[1]} onClick={()=>retrieveChart(0)}><img src='/public/chart/25110.png'/></li>
                <li><img src='/public/chart/25110.png'/></li>
                <li><img src='/public/chart/25110.png'/></li>
            </div>
        </div>
    )
}