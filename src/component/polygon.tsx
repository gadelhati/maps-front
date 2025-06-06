import { Identifiable, initialHateoas } from "./identifiable"

export interface Polygon extends Identifiable {
    readonly id: string,
    type: string,
    coordinates: L.LatLngExpression[][],
}
export interface PolygonValidation {
    readonly id: string,
    readonly type: string,
    readonly coordinates: string,
}
export const initialPolygonValidation: PolygonValidation = {
    id: `^[a-zA-Z0-9]+$`,
    type: `^[a-zA-Z0-9]+$`,
    coordinates: `^[a-zA-Z0-9]+$`,
}
export const initialPolygon : Polygon = {
    id: '',
    links: initialHateoas,
    type: '',
    coordinates: [],
}