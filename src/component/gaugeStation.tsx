import { initialPoint } from "./point";
import { ChartArea } from "./chartArea";
import { Point } from "./point";
import { State } from "./state";
import { Hateoas } from "./hetoas";

export interface GaugeStation extends Hateoas {
    readonly id: string,
    number: number,
    title: string,
    point: Point,
    state?: State,
    chartArea?: ChartArea,
}
export interface GaugeStationValidation {
    readonly id: string,
    readonly number: string,
    readonly title: string,
    readonly point: string,
    readonly state?: string,
    readonly chartArea?: string,
}
export const initialGaugeStationValidation: GaugeStationValidation = {
    id: `^[a-zA-Z0-9]+$`,
    number: `^[0-9]+$`,
    title: `^[a-zA-Z0-9]+$`,
    point: `^[a-zA-Z0-9]+$`,
    state: `^[a-zA-Z0-9]+$`,
    chartArea: `^[a-zA-Z0-9]+$`,
}
export const initialGaugeStation : GaugeStation = {
    id: '',
    number: 0,
    title: '',
    point: initialPoint,
    state: undefined,
    chartArea: undefined,
	links: {
        rel: '',
        href: '',
    },
}