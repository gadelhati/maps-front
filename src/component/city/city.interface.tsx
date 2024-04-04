import { State } from "../state/state.interface";

export interface City {
    readonly id: string,
    code: string,
    name: string,
    state?: State,
}