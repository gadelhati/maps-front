import { useEffect, useState } from "react";
import './google.map.css'
import { initMarker } from "./mark";

export const GoogleMap = () => {
    const [mark, setMark] = useState<google.maps.marker.AdvancedMarkerElement[]>([])

    useEffect(()=>{
        initMap()
    },[])

    const initMap = async() => {
        const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const map = new Map(document.getElementById('map') as HTMLElement, {
            center: { lat: 37.5, lng: -122.1 },
            zoom: 11,
            mapId: 'TERRAIN',
        })
        map.addListener("click", () => {
            console.log('qwe')
        })
        // initMarker(map)
        initMark(map)
    }
    const initMark = async(map: google.maps.Map) => {
        const { InfoWindow } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
        const pinScaled = new PinElement({
            glyph: '123',
            scale: 1.5,
            glyphColor: 'green',
            borderColor: 'red',
            background: 'yellow',
        });    
        setMark([new AdvancedMarkerElement({
            map,
            position: { lat: 37.4, lng: -122.0 },
            title: 'GADELHA 1',
            content: pinScaled.element,
            collisionBehavior: google.maps.CollisionBehavior.REQUIRED,
        }),new AdvancedMarkerElement({
            map,
            position: { lat: 37.5, lng: -122.1 },
            title: 'GADELHA 2',
            content: pinScaled.element,
            collisionBehavior: google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
        }),new AdvancedMarkerElement({
            map,
            position: { lat: 37.6, lng: -122.2 },
            title: 'GADELHA 3',
            content: pinScaled.element,
            collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
        })])
        const infoWindow = new InfoWindow({
            content: "321",
            disableAutoPan: true,
            ariaLabel: "Uluru",
        })
        mark.map((element) => {
            console.log(element.title)
            element.addListener("click", () => {
                infoWindow.close();
                console.log('agora')
                alert("Eu sou um alert!")
                infoWindow.setContent(mark[2].title);
                infoWindow.open(mark[2].map, mark[2]);
            })
        })
        mark[2].addListener("click", () => {
            infoWindow.close();
            console.log('agora')
            alert("Eu sou um alert!")
            infoWindow.setContent(mark[2].title);
            infoWindow.open(mark[2].map, mark[2]);
        })
    }
    // mark[2].addListener("click", () => {
    //     // infoWindow.close();
    //     console.log('agora')
    //     alert("Eu sou um alert!")
    //     // infoWindow.setContent(mark[2].title);
    //     // infoWindow.open(mark[2].map, mark[2]);
    // })

    return (
        <div id="map"></div>
    )
}