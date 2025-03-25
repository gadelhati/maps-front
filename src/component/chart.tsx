import { ChartArea, initialChartArea } from "./chartArea";
import { Hateoas } from "./hetoas";
import { initialPoint } from "./point";
import { Point } from "./point";

export interface Chart extends Hateoas {
    readonly id: string,
    number: number,
    title: string,
    scale: number,
    edition: Date[],
    ne: Point,
    sw: Point,
    chartArea?: ChartArea,
}
export interface ChartValidation {
    readonly id: string,
    number: string,
    title: string,
    scale: string,
    edition: string,
    ne: string,
    sw: string,
    chartArea: string,
}
export const initialChartValidation: ChartValidation = {
    id: `^[a-zA-Z0-9]+$`,
    number: `^[a-zA-Z0-9]+$`,
    title: `^[a-zA-Z0-9]+$`,
    scale: `^[a-zA-Z0-9]+$`,
    edition: `^[a-zA-Z0-9]+$`,
    ne: `^[a-zA-Z0-9]+$`,
    sw: `^[a-zA-Z0-9]+$`,
    chartArea: `^[a-zA-Z0-9]+$`,
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
    links: {
        rel: '',
        href: '',
    },
}