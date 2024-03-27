export const GoogleOverlay = (url: string, south: number, west: number, north: number, east: number): google.maps.GroundOverlay => {
    return(
        new google.maps.GroundOverlay(
            url,
            new google.maps.LatLngBounds(new google.maps.LatLng(south, west), new google.maps.LatLng(north, east))
        )
    )
}