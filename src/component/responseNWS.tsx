export interface ResponseNWS {
    features: Object[],
    observationStations: Object[],
    pagination: Object,
}
export const initialResponseNWS: ResponseNWS = {
    features: [],
    observationStations: [],
    pagination: {},
}

interface NWSPropertiesData {
    unitCode: string,
    value: number,
    qualityControl: string,
}
const initialNWSPropertiesData: NWSPropertiesData = {
    unitCode: '',
    value: 0,
    qualityControl: '',
}
interface NWSProperties {
    temperature: NWSPropertiesData,
    windDirection: NWSPropertiesData,
    windSpeed: NWSPropertiesData,
    barometricPressure: NWSPropertiesData,
    seaLevelPressure: NWSPropertiesData,
    visibility: NWSPropertiesData,
    maxTemperatureLast24Hours: NWSPropertiesData,
    minTemperatureLast24Hours: NWSPropertiesData,
    precipitationLast3Hours: NWSPropertiesData,
    relativeHumidity: NWSPropertiesData,
}
export const intialNWSProperties: NWSProperties = {
    temperature: initialNWSPropertiesData,
    windDirection: initialNWSPropertiesData,
    windSpeed: initialNWSPropertiesData,
    barometricPressure: initialNWSPropertiesData,
    seaLevelPressure: initialNWSPropertiesData,
    visibility: initialNWSPropertiesData,
    maxTemperatureLast24Hours: initialNWSPropertiesData,
    minTemperatureLast24Hours: initialNWSPropertiesData,
    precipitationLast3Hours: initialNWSPropertiesData,
    relativeHumidity: initialNWSPropertiesData,
}
export interface ResponseNWSData {
    context: [],
    id: string,
    type: string,
    geometry: Object,
    properties: NWSProperties,
}
export const initialResponseNWSData: ResponseNWSData = {
    context: [],
    id: '',
    type: '',
    geometry: {},
    properties: intialNWSProperties,
}