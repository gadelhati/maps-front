import { ChartArea, initialChartArea } from "./chart_area";
import { initialPoint } from "./point";
import { Point } from "./point";

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

export const initialChart : Chart = {
    id: '',
    number: 0,
    title: '',
    scale: 0,
    edition: [],
    ne: initialPoint,
    sw: initialPoint,
    chartArea: initialChartArea,
}