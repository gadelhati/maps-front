import { useEffect, useState, ChangeEvent } from 'react'
import { MapInterface } from '../all/map.interface'
import { GoogleOverlay } from './GoogleOverlay'
import { GoogleMarker } from './GoogleMarker'
// import { GoogleMarkerDefault } from './GoogleMarkerDefault'
// import { Glyph } from './GoogleGliph'
import icon from './../../assets/lighthouse.png'
import urlImage from './../../assets/1511geotiff.png'
import './GoogleTemplate.scss'
import mar from './mark.json'
import { ChartMenu } from '../menu/ChartMenu'

export const GoogleTemplate = (object: MapInterface) => {
    let checked: boolean = false
    const [collapse, setCollapse] = useState<boolean>(false)
    // const [map, setMap] = useState<google.maps.Map>(true)
    let map: google.maps.Map
    const [overlay, setOverlay] = useState<google.maps.GroundOverlay>(GoogleOverlay(urlImage, mar[0].south, mar[0].west, mar[0].north, mar[0].east))
    const [marker, setMarker] = useState<google.maps.Marker>(GoogleMarker(checked, icon, object.center))
    const [markerI, setMarkerI] = useState<boolean>(false)

    useEffect(() => {
        initMap()
    }, [collapse])
    const handleChecked = (event: ChangeEvent<HTMLInputElement>) => {
        checked = event.target.checked
        marker.setVisible(event.target.checked)
    }
    const showMap = () => {
        centralize(overlay.getBounds())
        overlay.setMap(overlay.getMap() === null ? map : null)
    }
    const showMark = () => {
        setMarkerI(!markerI)
        marker.setVisible(marker.getVisible() === false ? true : false)
    }
    const centralize = (center: google.maps.LatLngBounds | null) => {
        if(center !== null) map.setCenter(center?.getCenter())
    }
    const initMap = () => {
        map = new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: object.zoom,
            center: object.center,
            mapId: google.maps.MapTypeId.TERRAIN,
        });
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
                <div className='item sidemenu'>
                    <button className={marker.getVisible() ? "colored" : "grayscale"} onClick={showMark}><img src={icon}></img></button>
                    <div className='collapse'>
                        <button className={'menuitem'} onClick={() => setCollapse(!collapse)}>Collapse</button>
                        <button className={collapse ? "collapsed" : "collapsible"} onClick={showMark}><img src={icon}></img></button>
                        <button className={collapse ? "collapsed" : "collapsible"} onClick={showMap}>Map</button>
                        {/* <input type='checkbox' className={collapse ? "collapsed" : "collapsible"} onChange={handleChecked}></input> */}
                    </div>
                </div>
                <div className='item map' id='myMap'></div>
            </div>
            <ChartMenu setShow={showMap}></ChartMenu>
        </div>
    )
}