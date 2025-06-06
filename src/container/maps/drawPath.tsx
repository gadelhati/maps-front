import * as L from 'leaflet'

const exclusionBounds = L.latLngBounds([
    [-14, -48.5],
    [-13, -47.5]
]);

export const exclusionArea = L.rectangle(exclusionBounds, {
    color: "red",
    weight: 1,
    fillOpacity: 0.5
});

export const isInsideExclusion = (latlng: L.LatLng) => {
    return exclusionBounds.contains(latlng);
}

const crossesExclusion = (a: L.LatLng, b: L.LatLng) => {
    const steps = 100;
    for (let i = 0; i <= steps; i++) {
        const lat = a.lat + ((b.lat - a.lat) * i) / steps;
        const lng = a.lng + ((b.lng - a.lng) * i) / steps;
        if (isInsideExclusion(L.latLng(lat, lng))) return true;
    }
    return false;
}

export const DrawPath = (map: L.Map, from: any, to: L.LatLng) => {
    const queue = [[from]];
    const visited = new Set();
    const resolution = 0.1;

    const toKey = (latlng: L.LatLng) => `${latlng.lat.toFixed(6)},${latlng.lng.toFixed(6)}`;

    while (queue.length > 0) {
        const path = queue.shift();
        if (!path) continue;
        const current = path[path.length - 1];
        const key = toKey(current);

        if (visited.has(key)) continue;
        visited.add(key);

        if (
            Math.abs(current.lat - to.lat) < resolution &&
            Math.abs(current.lng - to.lng) < resolution
        ) {
            path.push(to);
            const pathLayer = L.polyline(path, { color: "blue" }).addTo(map);
            return pathLayer;
        }

        const directions = [
            L.latLng(current.lat + resolution, current.lng),
            L.latLng(current.lat - resolution, current.lng),
            L.latLng(current.lat, current.lng + resolution),
            L.latLng(current.lat, current.lng - resolution)
        ];

        for (const next of directions) {
            if (!isInsideExclusion(next) && !crossesExclusion(current, next)) {
                queue.push([...path, next]);
            }
        }
    }

    alert("Não foi possível traçar um caminho que evite a área de exclusão.");
    return null;
}