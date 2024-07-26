import { initialPolygon } from "../polygon/polygon";
import { Polygon } from "../polygon/polygon";

export interface MaritimeArea {
    readonly id: string,
    code: string,
    name: string,
    start: string,
    finish: string,
    polygon: Polygon,
    multiPolygon: string,
}

export const initialMaritimeArea : MaritimeArea = {
    id: '',
    code: '',
    name: '',
    start: '',
    finish: '',
    polygon: initialPolygon,
    multiPolygon: '',
}