export const mapa2 = (): google.maps.Map => {
    return(new google.maps.Map(document.getElementById("myMap") as HTMLElement, {
        zoom: 10,
        center: new google.maps.LatLng( 40.74, -74.18 ),
        mapId: '8e0a97af9386fef',
    }))
}