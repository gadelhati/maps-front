import { useEffect, useState } from 'react'
import { MapInterface } from './all/map.interface'
import { GoogleOverlay } from './GoogleBounds'
import { GoogleMarker } from './GoogleMarker'
// import { GoogleMarkerDefault } from './GoogleMarkerDefault'
// import { Glyph } from './GoogleGliph'
// import icon from './../assets/lighthouse.png'
import './GoogleMap.scss'

export const GoogleMap = (object: MapInterface) => {
    const [showMark, setShowMark] = useState<boolean>(true)
    // const [showMap, setShowMap] = useState<boolean>(true)
    let map: google.maps.Map
    // let overlay: google.maps.GroundOverlay

    useEffect(() => {
        initMap()
    }, [showMark])
    const showMarkIcon = () => {
        setShowMark(!showMark)
    }
    // const showMap = () => {
    //     overlay.setMap(map)
    // }
    // const hideMap = () => {
    //     overlay.setMap(null)
    // }

    const initMap = () => {
        map = new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: object.zoom,
            center: object.center,
            mapId: object.mapId,
        });

        const imageBounds: google.maps.LatLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.712216, -74.22655),
            new google.maps.LatLng(40.773941, -74.12544)
        );
        let overlay = GoogleOverlay("https://storage.googleapis.com/geo-devrel-public-buckets/newark_nj_1922-661x516.jpeg", imageBounds).setMap(map)

        const priceTag = document.createElement('div');
        priceTag.className = 'price-tag';
        priceTag.textContent = '$2.5M';
        const image = {
            url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            size: new google.maps.Size(20, 32),
            // origin: new google.maps.Point(0, 0),
            // anchor: new google.maps.Point(0, 32),
        };
        const marker = GoogleMarker(showMark, map, object.center, image)
        // const markerDefault = GoogleMarkerDefault(map, object.center, priceTag)
        // const markerDefault2 = GoogleMarkerDefault(map, object.center, Glyph('yellow', 'green', 'lightgreen').element)
    }
    return (
        <div className='all'>
            <button onClick={showMarkIcon}>{showMark? "Hide Icon" : "Show Icon"}</button>
            <div className='divisao' id='myMap'></div>
        </div>
    )
}