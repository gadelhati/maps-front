import { useLoadScript, GoogleMap, MarkerF, KmlLayer, CircleF, GroundOverlay } from '@react-google-maps/api'
import '../MapGoogle.scss'
import icon from '../../assets/lighthouse.png'
import { MapInterface } from './map.interface'
import * as fs from './fs.json'
// import * as kmz from './../assets/estacoes_fluviometricas.kmz'

export interface MapPageProps { }

export const MapGoogle = (object: MapInterface) => {
    // const [state, setState] = useState<MapInterface>(object)

    const { isLoaded } = useLoadScript({
        // googleMapsApiKey: typeof process.env.NEXT_PUBLIC_API_KEY === "string" ? process.env.NEXT_PUBLIC_API_KEY : ""
        googleMapsApiKey: "API_KEY"
    })
    const ex = () => {
        console.log("sim", fs.lat)
    }

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
    return (
        <div className='divisao'>
            {isLoaded &&
                <GoogleMap
                    // mapContainerStyle={object.mapContainerStyle}
                    center={object.center}
                    zoom={object.zoom}
                    mapContainerClassName='map-container'
                    // mapTypeId='terrain'
                >
                    {/* <Marker position={position} icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'} title='Casa do Gadelha'></Marker> */}
                    <MarkerF
                        position={object.center}
                        // icon={'http://maps.google.com/mapfiles/kml/pal4/icon47.png'}
                        icon={icon}
                        // icon={icons.info.icon}
                        options={{
                            label: {
                                text: "Casa",
                                className: "map-marker"
                            }
                        }}
                        onClick={ex}
                    />
                    {/* <GroundOverlay

                    ></GroundOverlay> */}
                    {/* <GroundOverlay
                        url="https://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg"
                        bounds={}
                        // bounds={new google.maps.LatLngBounds(
                        //     new google.maps.LatLng(40.712216, -74.22655),
                        //     new google.maps.LatLng(40.773941, -74.12544)
                        // )}
                        opacity={.5}
                    /> */}
                    <CircleF
                        // key={index}
                        center={object.center}
                        radius={1000}
                        options={{
                            strokeColor: "#66009a",
                            strokeOpacity: 0.8,
                            strokeWeight: 2,
                            fillColor: `#66009a`,
                            fillOpacity: 0.35,
                            zIndex: 1
                        }}
                    />
                    {/* <KmlLayer
                        url={kmz}
                        options={{ preserveViewport: true }}
                    /> */}
                </GoogleMap>
            }
        </div>
    )
}