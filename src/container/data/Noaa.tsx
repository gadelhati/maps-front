import { useEffect, useState } from "react"
import * as L from 'leaflet'
import { apiNWS } from "../../assets/api/api"
import { intialNWSProperties, ResponseNWS, ResponseNWSData } from "../../component/responseNWS"

export const Noaa = () => {
    const center: L.LatLngExpression = [-22.8, -43]
    const [map, setMap] = useState<L.Map>()
    const [nws, setNWS] = useState<ResponseNWS>()
    const [observations, setObservations] = useState<ResponseNWSData>()
    const [feature, setFeature] = useState<L.FeatureGroup>()

    useEffect(() => {
        let base = L.map('map').setView(center, 11)
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            className: 'map-tiles',
            minZoom: 2,
            maxZoom: 8,
        }).addTo(base)
        setMap(base)
        retrieveNoaa('stations', setNWS)
        addMarker()
        return () => {
            base.remove()
        }
    }, [])
    const retrieveNoaa = async (endpoint: string, method: any) => {
        try {
            await apiNWS.get<ResponseNWS>(`/${endpoint}`).then((response: any)=>{
                if(response?.data) method(response.data)
            })
        } catch (error) {
            throw error
        }
    }
    const addMarker = () => {
        let featureGroup: L.FeatureGroup = L.featureGroup()
        let marker: L.Marker
        if(map !== undefined) {
            nws?.features.map((element: any)=>{
                marker = L.marker(element.geometry.coordinates)
                marker.on('click', ()=>retrieveNoaa(`stations/${element.properties.stationIdentifier}/observations/latest`, setObservations))
                marker.bindPopup(formatedPopup(observations!.properties))
                featureGroup.addLayer(marker)
            })
            setFeature(featureGroup)
        }
    }
    const showFromMap = () => {
        if(map !== undefined && feature !== undefined) {
            if(map.hasLayer(feature)) {
                map.removeLayer(feature)
            } else {
                map.addLayer(feature)
                map.fitBounds(feature.getBounds())
            }
        }
    }
    const formatedPopup = (object: Object):string => {
        return `<center><h3>Station</h3></center>` +
        Object.entries(object).map(([key, value])=>{
            if(intialNWSProperties.hasOwnProperty(key)) {
                return `<div><strong>${key}</strong>: ${value.value}</div>`
            }
        }).join(``)
    }
    return (
        <>
            <div className='menu'>
                {/* <span>National Climatic Data Center</span> */}
                <button onClick={addMarker}>Add Noaa</button>
                <button onClick={showFromMap}>Marker</button>
            </div>
            <div id='map' style={{ height: '100vh', width: '100vw' }}></div>
        </>
    )
}