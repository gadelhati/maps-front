export const GoogleMarkerDefault = (map: google.maps.Map, position: google.maps.LatLng, content: Node) => {
    new google.maps.marker.AdvancedMarkerElement({
        map,
        collisionBehavior: google.maps.CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY,
        position: position,
        content: content,
        title: "Gadelha",
        zIndex: 0,
        // altitude: 20,
    })
}