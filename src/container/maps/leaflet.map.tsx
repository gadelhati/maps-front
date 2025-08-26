import { ChangeEvent, useEffect, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import { retrieve } from '../../service/service.crud';
import { UriToScreenFormat } from '../../assets/hook/useUriFormat';
import { GaugeStation } from '../../component/gaugeStation';
// import './leaflet.css'
import { Chart } from '../../component/chart';
import { MaritimeArea } from '../../component/maritimeArea';
import { useComponent } from './useComponent';
// import { useMap } from './useMap';
import { initialPoint, Point } from '../../component/point';
import { Search } from '../../component/search';

export const LeafletMap = () => {
    const center: L.LatLngExpression = [-22.8, -43]
    const [ map, setMap ] = useState<any>()
    const [, setOverlay ] = useState<L.ImageOverlay>()
    const [ overlays ] = useState<L.ImageOverlay[]>([])
    const [ charts, setCharts ] = useState<Chart[]>([])
    const [ , setMaritimeArea ] = useState<MaritimeArea[]>([])
    // const [ polygon, setPolygon ] = useState<L.Polygon>()
    // const [ show, setShow ] = useState<boolean[]>([true, true, true, true, true, true, true, true, true])
    const { pointList, add, get, setOrder, handleChangeLongitude, handleChangeLatitude, remove } = useComponent<GaugeStation>('gaugeStation', 0)
    const { show, markers, polygons, addPolygon, addMarkers, addOverlay, hideFromMap } = useMap(0)
    const [ modal, showModal ] = useState<boolean>(true)
    let item: string = '/chart/'

    useEffect(()=>{
        let base = L.map('map').setView(center, 11)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: 'map-tiles'
            // maxZoom: 8,
        }).addTo(base)
        setMap(base)
        return () => {
            retrieveCharts('chart', 'number')
            retrieveMaritimeArea('maritimeArea', '')
            base.remove()
        }
    }, [])
    const [ hook, setHook ] = useState<Point>(initialPoint)
    useEffect(() => {
        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            setHook({...hook, [event.target.name]: event.target.value })
        }
        document.addEventListener('change', ()=>handleChange)
        // get()
        return (() => {
            // add()
            document.removeEventListener('change', ()=>handleChange)
        })
    }, [hook])
    // const toggleShow = (index: number) => {
    //     let value = show.slice()
    //     value[index] = !show[index]
    //     setShow(value)
    // }
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
    const retrieveCharts = async(url: string, sort: string) => {
        let searched: Search = {page: 0, size: 1000, sort: {key: sort, order: 'ASC'}, value: ''}
        await retrieve(url, searched)
            .then((data: any) => {
                setCharts(data.content)
            });
    }
    const retrieveMaritimeArea = async(url: string, sort: string) => {
        let searched: Search = {page: 0, size: 1000, sort: {key: sort, order: 'ASC'}, value: ''}
        await retrieve(url, searched)
            .then((data: any) => {
                setMaritimeArea(data.content)
            });
    }
    const retrieveChart = async(index: number) => {
        // toggleShow(1)
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
    // const itemPolygon = () => {
    //     toggleShow(2)
    //     setPolygon(addPolygon1(map, L.polygon([[-28.6, -48.8166666666666667], [-31, -43], [-26, -38], [-23.0166666666666667, -42], [-28.6, -48.8166666666666667]], {color: 'red'})))
    // }
    // const itemPolygons = () => {
    //     toggleShow(3)
    //     maritimeArea.forEach((element: MaritimeArea)=>{
    //         element.polygon.coordinates[0].forEach((item: any)=>{
    //             return item.reverse()
    //         })
    //     })
    //     setPolygon(addPolygon1(map, L.polygon(maritimeArea[7].polygon.coordinates, {color: 'green'})))
    //     maritimeArea.forEach((element: MaritimeArea)=>{
    //         element.polygon.coordinates[0].forEach((item: any)=>{
    //             return item.reverse()
    //         })
    //     })
    // }
    // const removeOnMap = (index: number, element: any) => {
    //     toggleShow(index)
    //     map.removeLayer(element)
    // }
    const playSound = () => {
        let audio = new Audio("/assets/sound/click_sound.mp3")
        audio.play()
    }
    const open = (name: string) => {
        (document.querySelector('.' + name) as HTMLDialogElement).showModal()
        showModal(!modal)
    }
    const close = (name: string) => {
        (document.querySelector('.' + name) as HTMLDialogElement).close()
        showModal(!modal)
    }
    return (
        <div>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
            <dialog className='group'>
                <header><h2>{UriToScreenFormat('map')}</h2><span onClick={() => close('group')}>&times;</span></header>
                <center>
                    <button onClick={()=>get()}>{UriToScreenFormat('get')}</button>
                    <button onClick={()=>add()}>{UriToScreenFormat('add')}</button>
                    <ol>
                    {pointList[0]?.map((element: Point, index: number)=>{
                        return <li onMouseEnter={()=>setOrder(index)} key={Math.random()}>
                            <span className={'inputgroup tooltip'} key={Math.random()} data-tip={''}>
                                <input name='coordinates' value={element.coordinates[1]} onChange={handleChangeLatitude} key={Math.random()}></input>
                                {/* <label htmlFor={'latitude'}>{'latitude'}</label> */}
                            </span>
                            <span className={'inputgroup tooltip'} key={Math.random()} data-tip={''}>
                                <input name='coordinates' value={element.coordinates[0]} onChange={handleChangeLongitude} key={Math.random()}></input>
                                {/* <label htmlFor={'longitude'}>{'longitude'}</label> */}
                            </span>
                            <button onClick={remove} key={Math.random()}>rm</button>
                            </li>
                    })}
                    </ol>
                </center>
            </dialog>
            <div className='menu'>
                <button onClick={modal ? ()=>open('group') : ()=>close('group')}>
                    {UriToScreenFormat(modal ? 'open' : 'close')}
                </button>
                <button onClick={show[0] ? ()=>addMarkers(map, pointList[0]) : ()=>hideFromMap(map, markers[0]) }>
                    {UriToScreenFormat(show[0] ? 'p' : 'p remove')}{show[0]}
                </button>
                <button onClick={show[0] ? ()=>addPolygon(map, pointList[0]) : ()=>hideFromMap(map, polygons[0]) }>
                    {UriToScreenFormat(show[0] ? 'm' : 'm remove')}{show[0]}
                </button>
                {/* <button hidden={!show[2]} onClick={itemPolygon}>{UriToScreenFormat('polygon')}{show[2]}</button>
                <button hidden={show[2]} onClick={()=>removeOnMap(2, polygon)}>{UriToScreenFormat('rm polygon')}{show[2]}</button>
                <button hidden={!show[3]} onClick={itemPolygons}>{UriToScreenFormat('polygons')}{show[3]}</button>
                <button hidden={show[3]} onClick={()=>removeOnMap(3, polygon)}>{UriToScreenFormat('rm polygons')}{show[3]}</button> */}
                {/* <button hidden={!show[4]} onClick={itemPolygons}>{UriToScreenFormat('area')}{show[4]}</button>
                <button hidden={show[4]} onClick={()=>removeOnMap(4, polygon)}>{UriToScreenFormat('rm area')}{show[4]}➕</button> */}
            </div>
            <div className='chart'>
                {charts.map((element:any, index:number)=>{
                    if(index < 3) {
                        return <li  key={Math.random()}className='menuitem' onClick={()=>retrieveChart(index)}>
                            <label key={Math.random()}>{element.number}</label>
                            <img src={item.concat(element.number).concat('.png')} key={Math.random()}/>
                        </li>
                    }
                })}
            </div>
        </div>
    )
}