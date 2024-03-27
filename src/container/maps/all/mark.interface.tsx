export interface MarkInterface {
    southwest: google.maps.LatLng,
    northeast: google.maps.LatLng,
}

export const MarkInitial: MarkInterface = {
    southwest: new google.maps.LatLng(-23.000000, -43.233330),
    northeast: new google.maps.LatLng(-22.866670, -43.044440),
}