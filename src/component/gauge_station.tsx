import { initialPoint } from "./point";
import { ChartArea } from "./chart_area";
import { Point } from "./point";
import { State } from "./state";

export interface GaugeStation {
    readonly id: string,
    number: number,
    title: string,
    point: Point,
    state?: State,
    chartArea?: ChartArea,
}

export const initialGaugeStation : GaugeStation = {
    id: '',
    number: 0,
    title: '',
    point: initialPoint,
    state: undefined,
    chartArea: undefined,
}