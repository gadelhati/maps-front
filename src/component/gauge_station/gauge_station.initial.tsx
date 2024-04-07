import { initialPoint } from "../point/point.initial";
import { GaugeStation } from "./gauge_station.interface";

export const initialGaugeStation : GaugeStation = {
    id: '',
    number: 0,
    title: '',
    point: initialPoint,
    state: undefined,
    chartArea: undefined,
}