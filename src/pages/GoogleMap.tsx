import { useEffect, useState } from 'react'
import { MapInterface } from './all/map.interface'
import { GoogleOverlay } from './GoogleBounds'
import { GoogleMarker } from './GoogleMarker'
// import { GoogleMarkerDefault } from './GoogleMarkerDefault'
// import { Glyph } from './GoogleGliph'
import icon from './../assets/lighthouse.png'
import tt from '../assets/1511geotiff.png'
import './GoogleMap.scss'

export const GoogleMap = (object: MapInterface) => {
    const [showMark, setShowMark] = useState<boolean>(true)
    // const [showMap, setShowMap] = useState<boolean>(true)
    let map: google.maps.Map
    // let overlay: google.maps.GroundOverlay
    let overlay2: google.maps.GroundOverlay
    let marker: google.maps.Marker
    
    useEffect(() => {
        initMap()
    }, [showMark])
    const showMarkIcon = () => {
        setShowMark(!showMark)
    }
    const showMap = () => {
        // overlay.setMap(map)
        overlay2.setMap(map)
    }
    const hideMap = () => {
        // overlay.setMap(null)
        overlay2.setMap(null)
    }

    const initMap = () => {
        map = new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: object.zoom,
            center: object.center,
            mapId: google.maps.MapTypeId.TERRAIN,
        });

        const imageBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.712216, -74.22655),
            new google.maps.LatLng(40.773941, -74.12544)
        );
        // overlay = GoogleOverlay("https://storage.googleapis.com/geo-devrel-public-buckets/newark_nj_1922-661x516.jpeg", imageBounds)

        // const imageBounds2: google.maps.LatLngBounds = new google.maps.LatLngBounds(
        //     new google.maps.LatLng(-38.000000, -59.000000),
        //     new google.maps.LatLng(9.000000, -25.000000),
        // );
        const imageBounds2: google.maps.LatLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(-23.000000, -43.233330),
            new google.maps.LatLng(-22.866670, -43.044440),
        );
        overlay2 = GoogleOverlay(tt, imageBounds2)

        const priceTag = document.createElement('div');
        priceTag.className = 'price-tag';
        priceTag.textContent = '$2.5M';
        // const image = {
        //     url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //     size: new google.maps.Size(20, 32),
        //     // origin: new google.maps.Point(0, 0),
        //     // anchor: new google.maps.Point(0, 32),
        // };
        marker = GoogleMarker(showMark, map, object.center, icon)
        // const markerDefault = GoogleMarkerDefault(map, object.center, priceTag)
        // const markerDefault2 = GoogleMarkerDefault(map, object.center, Glyph('yellow', 'green', 'lightgreen').element)
    }
    return (
        <div className='container'>
            <div className='item sidemenu'>
                <button className={showMark? "colored" : "grayscale"} onClick={showMarkIcon}><img src={icon}></img></button>
                <button className='menuitem' onClick={showMap}>Show</button>
                <button className='menuitem' onClick={hideMap}>Hide</button>
            </div>
            <div className='item map' id='myMap'></div>
        </div>
    )
}