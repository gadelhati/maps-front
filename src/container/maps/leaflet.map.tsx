import { ChangeEvent, useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/uri.format';
import { GaugeStation } from '../../component/gauge_station';
import { addFeatureGroup , addOverlay, addPoint, addPointList, addPolygon } from './addItem';
import './leaflet.css'
import { Chart } from '../../component/chart';
import { MaritimeArea } from '../../component/maritime_area';
import { initialPoint, Point } from '../../component/point';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-23, -43]
    const [ map, setMap ] = useState<any>()
    const [ markers, setMarkers ] = useState<L.LayerGroup>()
    const [, setOverlay ] = useState<L.ImageOverlay>()
    const [ overlays ] = useState<L.ImageOverlay[]>([])
    const [ charts, setCharts ] = useState<Chart[]>([])
    const [ maritimeArea, setMaritimeArea ] = useState<MaritimeArea[]>([])
    const [ point, setPoint ] = useState<Point>(initialPoint)
    
    const [ pointList, setPointList ] = useState<Point[]>([])
    const [ polygon, setPolygon ] = useState<L.Polygon>()
    const [ show, setShow ] = useState<boolean[]>([true, true, true, true, true, true, true, true, true])
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
        setPolygon(addPolygon(map, L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'})))
    }
    const itemPolygons = () => {
        toggleShow(3)
        maritimeArea.forEach((element: MaritimeArea)=>{
            element.polygon.coordinates[0].forEach((item: any)=>{
                return item.reverse()
            })
        })
        setPolygon(addPolygon(map, L.polygon(maritimeArea[7].polygon.coordinates, {color: 'green'})))
        maritimeArea.forEach((element: MaritimeArea)=>{
            element.polygon.coordinates[0].forEach((item: any)=>{
                return item.reverse()
            })
        })
    }
    const remove = (index: number, element: any) => {
        toggleShow(index)
        map.removeLayer(element)
    }
    const playSound = () => {
        let audio = new Audio("/assets/sound/click_sound.mp3")
        audio.play()
    }
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        // const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        // if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
        setPoint({...point, [event.target.name]: event.target.value})
        // }
    }
    const handleInputLatitude = (event: ChangeEvent<HTMLInputElement>) => {
        // point.coordinates.splice(1, 0, Number(event.target.value))
        // setPoint({...point, [event.target.name]: point.coordinates}
        setPoint({...point, [event.target.name]: [point.coordinates[0], Number(event.target.value)]})
    }
    const handleInputLongitude = (event: ChangeEvent<HTMLInputElement>) => {
        setPoint({...point, [event.target.name]: [event.target.value, point.coordinates[1]]})
    }
    const handleStates = (point: Point) => {
        setPointList([...pointList, point])
    }
    const handleInputLatitudeIndex = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setPointList([...pointList, 
            {...point, [event.target.name]: [point.coordinates[0], Number(event.target.value)]}
        ])
    }
    const handleInputLongitudeIndex = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        setPoint({...point, [event.target.name]: [event.target.value, point.coordinates[1]]})
    }
    const addItemPolygon = (map: L.Map, points: Point[]) => {
        toggleShow(8)
        let list:[number, number][] = []
        points.forEach((point:Point)=>{
            list.push([point.coordinates[1], point.coordinates[0]])
        })
        setPolygon(addPolygon(map, L.polygon(list, {color: 'red'})))
        // setPointList1(addPolygon(map, L.polygon(list, {color: 'red'})))
    }
    return (
        <div>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
            <dialog open className='newdialog'>
                <button onClick={()=>addPoint(map, point.coordinates[1], point.coordinates[0], 'gadelha')}>Map Point</button>
                <button onClick={()=>handleStates(point)}>Add Point</button>
                <button onClick={()=>addPointList(map, pointList)}>Show List</button>
                <button hidden={!show[8]} onClick={()=>addItemPolygon(map, pointList)}>{UriToScreenFormat('new polygon')}</button>
                <button hidden={show[8]} onClick={()=>remove(8, polygon)}>{UriToScreenFormat('rm polygon')}</button>

                <input name='coordinates' value={point.coordinates[0]} onChange={handleInputLongitude}></input>
                <input name='coordinates' value={point.coordinates[1]} onChange={handleInputLatitude} type='number'></input>
                <ol>
                {pointList.map((element: Point, index: number)=>{
                    return <li>
                        <input name='coordinates' value={element.coordinates[0]} onChange={handleInputLongitude}></input>
                        <input name='coordinates' value={element.coordinates[1]} onChange={handleInputLatitude}></input>
                        {element.coordinates[0]}{element.coordinates[1]}
                        </li>
                })}
                </ol>
                <>{point.coordinates[0]}, {point.coordinates[1]}</>
            </dialog>
            <div className='menu'>
                <button hidden={!show[0]} onClick={()=>retrieveItem('gaugeStation', 'title')}>{UriToScreenFormat('gauge')}{show[0]}</button>
                <button hidden={show[0]} onClick={()=>remove(0, markers)}>{UriToScreenFormat('rm gauge')}{show[0]}</button>
                {/* <button onClick={()=>retrieveChart(0)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 0')}</button>
                <button onClick={()=>retrieveChart(1)}>{show[1] ? UriToScreenFormat('overlay') : UriToScreenFormat('overlay 1')}</button> */}
                <button hidden={!show[2]} onClick={itemPolygon}>{UriToScreenFormat('polygon')}{show[2]}</button>
                <button hidden={show[2]} onClick={()=>remove(2, polygon)}>{UriToScreenFormat('rm polygon')}{show[2]}</button>
                <button hidden={!show[3]} onClick={itemPolygons}>{UriToScreenFormat('polygons')}{show[3]}</button>
                <button hidden={show[3]} onClick={()=>remove(3, polygon)}>{UriToScreenFormat('rm polygons')}{show[3]}</button>
                <button hidden={!show[4]} onClick={itemPolygons}>{UriToScreenFormat('area')}{show[4]}</button>
                <button hidden={show[4]} onClick={()=>remove(4, polygon)}>{UriToScreenFormat('rm area')}{show[4]}</button>
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