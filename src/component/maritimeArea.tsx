import { Identifiable, initialHateoas } from "./identifiable";
import { initialPolygon } from "./polygon";
import { Polygon } from "./polygon";

export interface MaritimeArea extends Identifiable {
    readonly id: string,
    code: string,
    name: string,
    start: string,
    finish: string,
    polygon: Polygon,
    multiPolygon: string,
}
export interface MaritimeAreaValidation {
    readonly id: string,
    readonly code: string,
    readonly name: string,
    readonly start: string,
    readonly finish: string,
    readonly polygon: string,
    readonly multiPolygon: string,
}
export const initialMaritimeAreaValidation: MaritimeAreaValidation = {
    id: `^[a-zA-Z0-9]+$`,
    code: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    start: `^[a-zA-Z0-9]+$`,
    finish: `^[a-zA-Z0-9]+$`,
    polygon: `^[a-zA-Z0-9]+$`,
    multiPolygon: `^[a-zA-Z0-9]+$`,
}
export const initialMaritimeArea : MaritimeArea = {
    id: '',
    links: initialHateoas,
    code: '',
    name: '',
    start: '',
    finish: '',
    polygon: initialPolygon,
    multiPolygon: '',
}