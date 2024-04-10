import { ChartArea } from "../chart_area/chart_area.interface";
import { Point } from "../point/point.interface";

export interface Chart {
    readonly id: string,
    number: number,
    title: string,
    scale: number,
    edition: Date[],
    ne: Point,
    sw: Point,
    chartArea?: ChartArea,
}