import { useEffect, useState, useTransition } from "react"
import { retrieve } from "../../service/service.crud"
import { ErrorMessage } from "../../assets/error/errorMessage"
import { initialGaugeStation } from "../../component/gauge_station/gauge_station.initial"
import { initialErrorMessage } from "../../assets/error/errorMessage.initial"
import { GaugeStation } from "../../component/gauge_station/gauge_station.interface"
import { element } from "prop-types"
// import { getPayload } from "../../service/service.token"

export const GaugeStationList = () => {
    const [state, setState] = useState<GaugeStation>(initialGaugeStation)
    const [states, setStates] = useState<GaugeStation[]>([initialGaugeStation])
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        {ispending}
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        await retrieve('gauge_station', 0, 0, undefined, undefined).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
            startTransition(() => setStates(data?.content))
        })
    }
    return(
        <div>
            {states.map((element: GaugeStation)=>{
                return <p>{JSON.stringify(element.point.coordinates[0])}</p>
            })}
        </div>
    )
}