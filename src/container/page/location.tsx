import { useEffect, useState, useTransition } from "react"
import { retrieve } from "../../service/service.crud"
import { ErrorMessage } from "../../assets/error/errorMessage"
import { initialLocation } from "../../component/location/location.initial"
import { initialErrorMessage } from "../../assets/error/errorMessage.initial"
import { Location } from "../../component/location/location.interface"
// import { getPayload } from "../../service/service.token"

export const LocationList = () => {
    const [state, setState] = useState<Location>(initialLocation)
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()

    useEffect(() => {
        {ispending}
        retrieveItem()
    }, [])
    const retrieveItem = async () => {
        await retrieve('location', 0, 0, undefined, undefined).then((data: any) => {
            startTransition(() => setState(data?.content[0]))
        })
    }
    return(
        <div>
            <div>{JSON.stringify(state.point.coordinates[0])}</div>
            <div>{JSON.stringify(state.point.coordinates[1])}</div>
        </div>
    )
}