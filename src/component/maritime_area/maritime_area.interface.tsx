import { Polygon } from "../polygon/polygon.interface";

export interface MaritimeArea {
    readonly id: string,
    code: string,
    name: string,
    start: string,
    finish: string,
    polygon: Polygon,
    multiPolygon: string,
}