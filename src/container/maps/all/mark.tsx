export const initMarker = (map: any) => {

    const pinScaled = new google.maps.marker.PinElement({
        glyph: '123',
        scale: 1.5,
        glyphColor: 'green',
        borderColor: 'red',
        background: 'yellow',
    });
    const infoWindow = new google.maps.InfoWindow({
        content: "321",
        disableAutoPan: true,
        ariaLabel: "Uluru",
    })

    return [new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 37.4, lng: -122.0 },
        title: 'GADELHA 1',
        content: pinScaled.element,
        collisionBehavior: google.maps.CollisionBehavior.REQUIRED,
    }).addListener('click',()=>{console.log('123')}),new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 37.5, lng: -122.1 },
        title: 'GADELHA 2',
        content: pinScaled.element,
        collisionBehavior: google.maps.CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL,
    }),new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 37.6, lng: -122.2 },
        title: 'GADELHA 3',
        content: pinScaled.element,
        collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
    })]
}