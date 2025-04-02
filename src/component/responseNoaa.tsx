interface ResultSet {
    count: number,
    limit: number,
    offset: number,
}
const initialResultSet: ResultSet = {
    count: 0,
    limit: 25,
    offset: 1,
}

export interface ResponseNoaa {
    metadata: ResultSet,
    results: Object[],
}
export const initialResponseNoaa: ResponseNoaa = {
    metadata: initialResultSet,
    results: []
}

export interface ReponseNoaaData {
    datasetid: string,
    datatypeid?: string,
    locationid?: string,
    stationid?: number,
    startdate?: Date,
    enddate?: Date,
    units?: string,
    sortfield?: string,
    sortorder?: 'asc' | 'desc',
    limit?: number,
    offset?: number,
    includemetadata?: boolean,
}
export const initialReponseNoaaData: ReponseNoaaData = {
    datasetid: 'GSOM',
    startdate: new Date(),
    enddate: new Date(),
}