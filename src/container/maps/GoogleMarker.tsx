export const GoogleMarker = (visible: boolean, icon: string | google.maps.Icon | google.maps.Symbol, position: google.maps.LatLng): google.maps.Marker => {
    return(
        new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: position,
            icon: icon,
            optimized: true,
            visible: visible,
        })
    )
}