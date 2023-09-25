import { useLoadScript, GoogleMap, MarkerF, KmlLayer, CircleF } from '@react-google-maps/api'
import './MapGoogle.scss'
import icon from './../assets/lighthouse.png'
import { MapInterface } from './map.interface'
import * as fs from './fs.json'
import { useEffect } from 'react'
import { marker } from 'leaflet'
// import * as kmz from './../assets/estacoes_fluviometricas.kmz'

export interface MapPageProps { }

export const MapGoogle3 = (object: MapInterface) => {
    // const [state, setState] = useState<MapInterface>(object)

    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: typeof process.env.NEXT_PUBLIC_API_KEY === "string" ? process.env.NEXT_PUBLIC_API_KEY : ""
        googleMapsApiKey: "API_KEY"
    })
    const ex = () => {
        console.log("sim", fs.lat)
    }

    useEffect(()=>{
        mapp()
    })
    // var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    // var icons = {
    //     parking: {
    //         icon: iconBase + 'parking_lot_maps.png'
    //     },
    //     library: {
    //         icon: iconBase + 'library_maps.png'
    //     },
    //     info: {
    //         icon: iconBase + 'info-i_maps.png'
    //     }
    // };

    // const carregar = () => {
    //     var latlng = new google.maps.LatLng(-18.8800397, -47.05878999999999);
    //     var options = {
    //         zoom: 5,
    //         center: latlng,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     setMap(new google.maps.Map(document.getElementById("mapa"), options))
    // }
    const mapp = () => {
        const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
            center: object.center,
            zoom: 14,
            // mapId: '4504f8b37365c3d0',
        });
        const markerView = new google.maps.marker.AdvancedMarkerElement({
            map,
            position: object.center,
        });
    }

    // const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
    //     center: object.center,
    //     zoom: 14,
    //     // mapId: '4504f8b37365c3d0',
    // });
    // const markerView = new google.maps.marker.AdvancedMarkerElement({
    //     map,
    //     position: object.center,
    // });

    return (
        <div className='divisao'>
            {isLoaded &&
                <></>
                // <GoogleMap
                //     // mapContainerStyle={object.mapContainerStyle}
                //     center={object.center}
                //     zoom={object.zoom}
                //     mapContainerClassName='map-container'
                //     // mapTypeId='terrain'
                // >
                //     {/* <Marker position={position} icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'} title='Casa do Gadelha'></Marker> */}
                //     <MarkerF
                //         position={object.center}
                //         // icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'}
                //         icon={icon}
                //         // icon={icons.info.icon}
                //         options={{
                //             label: {
                //                 text: "Casa",
                //                 className: "map-marker"
                //             }
                //         }}
                //         onClick={ex}
                //     />
                //     <CircleF
                //         // key={index}
                //         center={object.center}
                //         radius={1000}
                //         options={{
                //             strokeColor: "#66009a",
                //             strokeOpacity: 0.8,
                //             strokeWeight: 2,
                //             fillColor: `#66009a`,
                //             fillOpacity: 0.35,
                //             zIndex: 1
                //         }}
                //     />
                //     {/* <>{markerView}</> */}
                //     {/* <KmlLayer
                //         url={kmz}
                //         options={{ preserveViewport: true }}
                //     /> */}
                // </GoogleMap>
            }
        </div>
    )
}