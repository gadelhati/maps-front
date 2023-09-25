export interface MapInterface {
    zoom: number
    center: google.maps.LatLng,
    mapId: string,
}

export const InitialMap: MapInterface = {
    zoom: 11,
    center: new google.maps.LatLng(40.74, -74.18),
    mapId: '8e0a97af9386fef',
}