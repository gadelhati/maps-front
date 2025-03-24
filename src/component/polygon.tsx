import { Hateoas } from "./hetoas"

export interface Polygon extends Hateoas {
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
    type: `^[0-9]+$`,
    coordinates: `^[0-9]+$`,
}
export const initialPolygon : Polygon = {
    id: '',
    type: '',
    coordinates: [],
	links: {
        rel: '',
        href: '',
    },
}