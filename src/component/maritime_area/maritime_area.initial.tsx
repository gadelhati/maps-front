import { MaritimeArea } from "./maritime_area.interface";
import { initialPolygon } from "../polygon/polygon.initial";

export const initialMaritimeArea : MaritimeArea = {
    id: '',
    code: '',
    name: '',
    start: '',
    finish: '',
    polygon: initialPolygon,
    multiPolygon: '',
}