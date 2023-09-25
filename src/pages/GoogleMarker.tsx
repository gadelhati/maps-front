export const GoogleMarker = (visible: boolean, map: google.maps.Map, position: google.maps.LatLng, icon: string | google.maps.Icon | google.maps.Symbol): google.maps.Marker => {
    return(
        new google.maps.Marker({
            position: position,
            map,
            icon: icon,
            optimized: true,
            visible: visible,
        })
    )
}