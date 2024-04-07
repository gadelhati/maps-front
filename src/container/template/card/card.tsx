import { useState, useEffect, useTransition } from 'react'
import { UriToScreenFormat } from '../../../assets/uri.format'
import { Icon } from '../../../assets/svg.access'
import { vector } from '../../menu/menu'
import { retrieve } from '../../../service/service.crud';
import { ErrorMessage } from '../../../assets/error/errorMessage';
import { initialErrorMessage } from '../../../assets/error/errorMessage.initial';
import './card.css'

export const Cards = () => {
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [ispending, startTransition] = useTransition()
    const [states, setStates] = useState<number[]>([])

    const retrieveItem = (url: string):any => {
        vector.map((element, index) =>
            retrieve(element[0]).then((data: any) => {
                return <>{data.totalElements}</>
            }).catch(() => { return 'data.totalElements' })
        )
    }
    return (
        <div className='card'>
            {vector.map((element, index) => {
                return <span key={Math.random()}><a key={Math.random()} href={`#/${vector[index][0]}`}><Icon name={vector[index][1]} /><p>{UriToScreenFormat(vector[index][0])}{retrieveItem(vector[index][0])}</p></a></span>
            })}
        </div>
    )
}