import * as L from 'leaflet'

const exclusionPolygon: L.LatLng[] = [
    L.latLng(-14, -48.5),
    L.latLng(-13.5, -48),
    L.latLng(-14, -47.5)
];

export const exclusionArea = L.polygon(exclusionPolygon, {
    color: "red",
    weight: 1,
    fillOpacity: 0.5
});

export const isInsideExclusion = (latlng: L.LatLng) => {
    return isPointInPolygon(latlng, exclusionPolygon);
}

export function isPointInPolygon(point: L.LatLng, polygon: L.LatLng[]): boolean {
    let inside = false;
    const { lat: y, lng: x } = point;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lng, yi = polygon[i].lat;
        const xj = polygon[j].lng, yj = polygon[j].lat;
        const intersect =
            (yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
        if (intersect) inside = !inside;
    }
    return inside;
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