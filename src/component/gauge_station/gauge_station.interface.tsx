import { ChartArea } from "../chart_area/chart_area.interface";
import { Point } from "../point/point.interface";
import { State } from "../state/state.interface";

export interface GaugeStation {
    readonly id: string,
    number: number,
    title: string,
    point: Point,
    state?: State,
    chartArea?: ChartArea,
}