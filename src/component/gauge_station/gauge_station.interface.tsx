import { Point } from "../point/point.interface";

export interface GaugeStation {
    readonly id: string,
    number: number,
    title: string,
    point: Point,
}