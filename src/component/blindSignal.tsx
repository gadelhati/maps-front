import { ChartArea, initialChartArea } from "./chartArea"
import { Identifiable, initialHateoas } from "./identifiable"
import { initialPoint, Point } from "./point"
import { initialState, State } from "./state"

export interface BlindSignal extends Identifiable {
    readonly id: string,
    name: string,
    chart: string,
    point: Point,
    description: string,
    observation: string,
    chartArea: ChartArea,
    state: State,
}
export interface BlindSignalValidation {
    readonly id: string,
    readonly name: string,
    readonly chart: string,
    readonly point: string,
    readonly description: string,
    readonly observation: string,
    readonly chartArea: string,
    readonly state: string,
}
export const initialBlindSignalValidation: BlindSignalValidation = {
    id: `^[a-zA-Z0-9]+$`,
    name: `^[a-zA-Z0-9]+$`,
    chart: `^[a-zA-Z0-9]+$`,
    point: `^[a-zA-Z0-9]+$`,
    description: `^[a-zA-Z0-9]+$`,
    observation: `^[a-zA-Z0-9]+$`,
    chartArea: `^[a-zA-Z0-9]+$`,
    state: `^[a-zA-Z0-9]+$`,
}
export const initialBlindSignal : BlindSignal = {
    id: '',
    links: initialHateoas,
    name: '',
    chart: '',
    point: initialPoint,
    description: '',
    observation: '',
    chartArea: initialChartArea,
    state: initialState,
}