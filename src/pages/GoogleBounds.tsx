export const GoogleOverlay = (url: string, bounds: google.maps.LatLngBounds): google.maps.GroundOverlay => {
    return(
        new google.maps.GroundOverlay(
            url,
            bounds
        )
    )
}