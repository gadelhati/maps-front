export const GoogleMap = (zoom: number, center: google.maps.LatLng, mapId: string): google.maps.Map => {
    return (
        new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
            zoom: zoom,
            center: center,
            mapId: mapId, //google.maps.MapTypeId.TERRAIN,
        })
    )
}