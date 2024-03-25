import { useEffect, useState, useTransition } from 'react'
import { InitialMap, MapInterface } from '../all/map.interface'
import { GoogleOverlay } from './GoogleOverlay'
import { GoogleMarker } from './GoogleMarker'
import { ChartMenu } from '../menu/ChartMenu'
import { GoogleMap } from './GoogleMap'
import { GoogleMarkerDefault } from './GoogleMarkerDefault'
import { Glyph } from './GoogleGliph'
import icon from './../../assets/lighthouse.png'
import './GoogleTemplate.scss'
import layer from './../layer.json'
import { initialGaugeStation } from '../../component/gauge_station/gauge_station.initial'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { GaugeStation } from '../../component/gauge_station/gauge_station.interface'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { retrieve } from '../../service/service.crud'
import { MarkInterface } from './mark.interface'

export const GoogleTemplate = (object: MapInterface) => {
    const [collapse, setCollapse] = useState<boolean>(false)
    // const [map, setMap] = useState<google.maps.Map|null>(null)
    let map:google.maps.Map
    const [overlay] = useState<google.maps.GroundOverlay[]>([
        GoogleOverlay(layer[0].urlImage, layer[0].south, layer[0].west, layer[0].north, layer[0].east),
        GoogleOverlay(layer[1].urlImage, layer[1].south, layer[1].west, layer[1].north, layer[1].east),
        GoogleOverlay(layer[2].urlImage, layer[2].south, layer[2].west, layer[2].north, layer[2].east)
    ])
    const [markerChecked, setMarkerChecked] = useState<boolean>(true)
    const [marker] = useState<google.maps.Marker>(GoogleMarker(markerChecked, icon, object.center))
    const [markers, setMarkers] = useState<google.maps.Marker[]>([])

    const [states, setStates] = useState<GaugeStation[]>([initialGaugeStation])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        initMap()
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        let mm: google.maps.Marker[] = []
        await retrieve('gauge_station', 0, 10000, 'title', '').then((data: any) => {
            startTransition(() => setStates(data?.content))
            data?.content.map((element: any, index: number)=> {
                return mm[index] = GoogleMarker(true, icon, new google.maps.LatLng(element.point.coordinates[1], element.point.coordinates[0]))    
            })
            setMarkers(mm)
        })
    }
    const showMap = (index: number) => {
        if(overlay[index].getMap() === null) centralize(overlay[index].getBounds(), index)
        overlay[index].setMap(overlay[index].getMap() === null ? map : null)
    }
    const showMark = () => {
        setMarkerChecked(!markerChecked)
        marker.setMap(marker.getMap() === null ? map : null)
        markers.map((element)=>{
            element.setMap(map)
        })
    }
    const centralize = (center: google.maps.LatLngBounds | null, index: number) => {
        // map?.setZoom(mar[index].scale/1600)
        console.log(layer[index].scale/1600)
        if(center !== null) map?.setCenter(center?.getCenter())
    }
    const initMap = () => {
        map = GoogleMap("map", 4, object.center, google.maps.MapTypeId.TERRAIN)
        
        // const image = {
        //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //     size: new google.maps.Size(20, 32),
        //     // origin: new google.maps.Point(0, 0),
        //     // anchor: new google.maps.Point(0, 32),
        // };
        // marker.setMap(map)
        overlay[0].setMap(map)
        overlay[1].setMap(map)
        // const markerDefault = GoogleMarkerDefault(map, object.center, priceTag)
        // const markerDefault2 = GoogleMarkerDefault(map, object.center, Glyph('yellow', 'green', 'lightgreen').element)
        vai(map)
        const marker = new google.maps.marker.AdvancedMarkerElement({
            position: object.center,
            map: map,
        });
    }
    const vai = (map: any) => {
        const priceTag = document.createElement('div');
        priceTag.className = 'price-tag';
        priceTag.textContent = '$2.5M';
        // let markerDefault = GoogleMarkerDefault(map, object.center, priceTag)
        // const markerDefault2 = GoogleMarkerDefault(map, object.center, Glyph('yellow', 'green', 'lightgreen').element)
    }
    return (
        <div className='template'>
            <div className='container'>
                <div className='sidemenu'>
                    <div className='collapse'>
                        <button className={'menuitem'} onClick={() => setCollapse(!collapse)}>Collapse</button>
                        <button className={!collapse ? "collapsible" : marker.getMap() === null ? "collapsed grayscale" : "collapsed colored"} onClick={showMark}><img src={icon}></img></button>
                        {/* <button className={collapse ? "collapsed" : "collapsible"} onClick={()=>showMap()}>Map</button>
                        <button className={collapse ? "collapsed" : "collapsible"} onClick={showMap2}>Map2</button> */}
                    </div>
                    {/* {JSON.stringify(markers)} */}
                    1
                    {/* {JSON.stringify(states)} */}
                </div>
                <div className='item map' id='map'></div>
            </div>
            <ChartMenu setShow={showMap}></ChartMenu>
        </div>
    )
}