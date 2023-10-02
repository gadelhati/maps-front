export const GoogleSetMap = (zoom: number, center: google.maps.LatLng): google.maps.Map => {
    return (
        new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: zoom,
            center: center,
            mapId: google.maps.MapTypeId.TERRAIN,
        })
    )
}