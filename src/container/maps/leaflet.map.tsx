import { useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface';
import { addFeatureGroup , addOverlay, addPolygon } from './addItem';
import './leaflet.css'
import { Chart } from '../../component/chart/chart.interface';
import { MaritimeArea } from '../../component/maritime_area/maritime_area.interface';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-23, -43]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    const [, setOverlay ] = useState<L.ImageOverlay>()
    const [ overlays ] = useState<L.ImageOverlay[]>([])
    const [ charts, setCharts ] = useState<Chart[]>([])
    const [ maritimeArea, setMaritimeArea ] = useState<MaritimeArea[]>([])
    const [ polygon, setPolygon ] = useState<L.Polygon>()
    const [ polygons, setPolygons ] = useState<L.Polygon[]>([])
    const [ show, setShow ] = useState<boolean[]>([true, true, true, true])
    // const [ tile, setTile ] = useState<boolean>(true)
    let item: string = '/chart/'

    useEffect(()=>{
        let base = L.map('map').setView(center, 13)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // maxZoom: 8,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(base)
        setMap(base)
        return () => {
            retrieveCharts('chart', 'number')
            retrieveMaritimeArea('maritimeArea', '')
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
    const retrieveMaritimeArea = async(url: string, sort: string) => {
        await retrieve(url, 0, 1000, sort, undefined)
            .then((data: any) => {
                setMaritimeArea(data.content)
            });
    }
    const retrieveChart = async(index: number) => {
        toggleShow(1)
        if(overlays[index] !== undefined && map.hasLayer(overlays[index])){
            map.removeLayer(overlays[index])
        } else {
            playSound()
            overlays[index] = addOverlay(charts[index].ne.coordinates.slice(0), charts[index].sw.coordinates.slice(0), charts[index].number.toString())
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
        console.log(polygon)
        setPolygon(addPolygon(map, L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'})))
    }
    const itemPolygons = () => {
        toggleShow(3)
        maritimeArea.forEach((element: MaritimeArea)=>{
            element.polygon.coordinates[0].forEach((item: any)=>{
                return item.reverse()
            })
        })
        setPolygons([addPolygon(map, L.polygon(maritimeArea[7].polygon.coordinates, {color: 'green'}))])
    }
    const remove = (index: number, element: any) => {
        toggleShow(index)
        map.removeLayer(element)
    }
    const playSound = () => {
        let audio = new Audio("/assets/sound/click_sound.mp3")
        audio.play()
    }
    return (
        <div>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
            <div className='menu'>
                <button hidden={!show[0]} onClick={()=>retrieveItem('gaugeStation', 'title')}>{UriToScreenFormat('gauge')}{show[0]}</button>
                <button hidden={show[0]} onClick={()=>remove(0, markers)}>{UriToScreenFormat('rm gauge')}{show[0]}</button>
                {/* <button onClick={()=>retrieveChart(0)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 0')}</button>
                <button onClick={()=>retrieveChart(1)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 1')}</button> */}
                <button hidden={!show[2]} onClick={itemPolygon}>{UriToScreenFormat('polygon')}{show[2]}</button>
                <button hidden={show[2]} onClick={()=>remove(2, polygon)}>{UriToScreenFormat('rm polygon')}{show[2]}</button>
                <button hidden={!show[3]} onClick={itemPolygons}>{UriToScreenFormat('polygons')}{show[3]}</button>
                <button hidden={show[3]} onClick={()=>remove(3, polygons[0])}>{UriToScreenFormat('rm polygons')}{show[3]}</button>
            </div>
            <div className='chart'>
                {charts.map((element:any, index:number)=>{
                    if(index < 3) {
                        return <li className='menuitem' aria-disabled={!show[1]} onClick={()=>retrieveChart(index)}>
                                <label>{element.number}</label>
                                <img src={item.concat(element.number).concat('.png')}/>
                            </li>
                    }
                })}
            </div>
        </div>
    )
}