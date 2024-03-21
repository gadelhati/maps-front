import { State } from "../state/state.interface";

export interface City {
    readonly id: string,
    name: string,
    state?: State,
}