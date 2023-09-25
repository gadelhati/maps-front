import { useState, useEffect } from 'react'
import { MapInterface } from './map.interface'
import './MapGoogle.scss'

export interface MapPageProps { }

export const MapGoogle5 = (object: MapInterface) => {
    const [mapa, setMapa] = useState<google.maps.Map>()

    useEffect(()=>{
        initMap()
    }, [])

    const initMap = () => {
        let overlay
        const map = new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: 11,
            center: new google.maps.LatLng( 40.74, -74.18 ),
            mapId: '8e0a97af9386fef',
        });
        const imageBounds = {
            north: 40.773941,
            south: 40.712216,
            east: -74.12544,
            west: -74.22655,
        };
        overlay = new google.maps.GroundOverlay(
            "https://storage.googleapis.com/geo-devrel-public-buckets/newark_nj_1922-661x516.jpeg",
            imageBounds
        );
        overlay.setMap(map);

        const viewGlyph = new google.maps.marker.PinElement({
            scale: 1.5,
            background: 'yellow',
            borderColor: 'green',
            glyphColor: 'lightgreen',
            //glyph: '',
        });
        const priceTag = document.createElement('div');
		priceTag.className = 'price-tag';
		priceTag.textContent = '$2.5M';
        const image = {
            url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
            size: new google.maps.Size(20, 32),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32),
        };
        const beachMarker = new google.maps.Marker({
            position: new google.maps.LatLng(40.74, -74.18),
            map,
            icon: image,
            optimized: true
        });
        const markerView = new google.maps.marker.AdvancedMarkerElement({
            map,
            collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
            position: { lat: 40.74, lng: -74.18 },
            content: viewGlyph.element,
            //content: priceTag
            // icon: image,
            title: "Gadelha",
            // altitude: 20,
            zIndex: 0
        });
    }
    return (
        <div className='divisao' id='myMap'></div>
    )
}