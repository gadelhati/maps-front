import { Point } from "../point/point.interface";

export interface Location {
    readonly id: string,
    point: Point,
}