import { initialChartArea } from "../chart_area/chart_area.initial";
import { initialPoint } from "../point/point.initial";
import { Chart } from "./chart.interface";

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