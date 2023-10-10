import { useEffect, useState } from 'react'
import { MapInterface } from '../all/map.interface'
import { GoogleOverlay } from './GoogleOverlay'
import { GoogleMarker } from './GoogleMarker'
import { ChartMenu } from '../menu/ChartMenu'
import { GoogleMap } from './GoogleMap'
// import { GoogleMarkerDefault } from './GoogleMarkerDefault'
// import { Glyph } from './GoogleGliph'
import icon from './../../assets/lighthouse.png'
import urlImage from './../../assets/1511geotiff.png'
import './GoogleTemplate.scss'
import mar from './mark.json'

export const GoogleTemplate = (object: MapInterface) => {
    const [collapse, setCollapse] = useState<boolean>(false)
    const [map, setMap] = useState<google.maps.Map|null>(null)
    const [overlay] = useState<google.maps.GroundOverlay>(GoogleOverlay(urlImage, mar[0].south, mar[0].west, mar[0].north, mar[0].east))
    const [markerChecked, setMarkerChecked] = useState<boolean>(true)
    const [marker] = useState<google.maps.Marker>(GoogleMarker(markerChecked, icon, object.center))

    useEffect(() => {
        initMap()
    }, [])
    const showMap = () => {
        centralize(overlay.getBounds())
        overlay.setMap(overlay.getMap() === null ? map : null)
    }
    const showMark = () => {
        setMarkerChecked(!markerChecked)
        marker.setMap(marker.getMap() === null ? map : null)
    }
    const centralize = (center: google.maps.LatLngBounds | null) => {
        if(center !== null) map?.setCenter(center?.getCenter())
    }
    const initMap = () => {
        setMap(GoogleMap("map", object.zoom, object.center, google.maps.MapTypeId.TERRAIN))
        const priceTag = document.createElement('div');
        priceTag.className = 'price-tag';
        priceTag.textContent = '$2.5M';
        // const image = {
        //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //     size: new google.maps.Size(20, 32),
        //     // origin: new google.maps.Point(0, 0),
        //     // anchor: new google.maps.Point(0, 32),
        // };
        marker.setMap(map)
        overlay.setMap(map)
        // const markerDefault = GoogleMarkerDefault(map, object.center, priceTag)
        // const markerDefault2 = GoogleMarkerDefault(map, object.center, Glyph('yellow', 'green', 'lightgreen').element)
    }
    return (
        <div className='template'>
            <div className='container'>
                <div className='sidemenu'>
                    <div className='collapse'>
                        <button className={'menuitem'} onClick={() => setCollapse(!collapse)}>Collapse</button>
                        <button className={!collapse ? "collapsible" : marker.getMap() === null ? "collapsed grayscale" : "collapsed colored"} onClick={showMark}><img src={icon}></img></button>
                        <button className={collapse ? "collapsed" : "collapsible"} onClick={showMap}>Map</button>
                    </div>
                </div>
                <div className='item map' id='map'></div>
            </div>
            <ChartMenu setShow={showMap}></ChartMenu>
        </div>
    )
}