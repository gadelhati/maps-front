export const GoogleMarker = (visible: boolean, icon: string | google.maps.Icon | google.maps.Symbol, position: google.maps.LatLng): google.maps.Marker => {
    return(
        new google.maps.Marker({
            position: position,
            icon: icon,
            optimized: true,
            visible: visible,
        })
    )
}