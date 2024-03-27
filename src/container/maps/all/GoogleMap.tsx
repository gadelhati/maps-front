export const GoogleMap = (name: string, zoom: number, center: google.maps.LatLng, mapId: string): google.maps.Map => {
    return (
        new google.maps.Map(document.getElementById(name) as HTMLElement, {
            zoom: zoom,
            center: center,
            mapId: mapId, //google.maps.MapTypeId.TERRAIN,
        })
    )
}