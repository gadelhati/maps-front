export interface Polygon {
    type: string,
    coordinates: [L.LatLngExpression[]],
}

export const initialPolygon : Polygon = {
    type: '',
    coordinates: [],
}