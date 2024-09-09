import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react'
import { useInput } from '../assets/hook/useInput'
import { create, update, remove } from '../service/service.crud'
import { useRequest } from '../assets/hook/useRequest'
import './modal.css'

export interface ModalData {
    showModal: () => void
    closeModal: () => void
}

interface Data<T> {
    object: T,
    ref: ModalData
}

const Modal = <T extends Object>(data: Data<T>, ref: Ref<ModalData>) => {
    const { state, setState, handleInput, handleSelect } = useInput<T>(data.object)
    const { states, retrieve } = useRequest<T>('url')
    // const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })

    useEffect(() => {
        setState(data.object)
    }, [data.object])

    const showModal = () => {
        (document.querySelector('#dialog') as HTMLDialogElement).show()
    }
    const closeModal = () => {
        (document.querySelector('#dialog') as HTMLDialogElement).close()
    }
    useImperativeHandle(ref, () => ({
        showModal, closeModal
    }))
    const fill = (uri: string) => {
        retrieve(uri)
    }
    return (
        <dialog id="dialog">
            {data.object !== undefined && Object.entries(state).map(([key, value]: [string, any]) => {
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    {typeof value}
                    {typeof value === 'object' ?
                    // {/* {Array.isArray(value) ? */}
                        <select key={key} name={key} onClick={()=>fill(key)} onChange={handleSelect}
                            defaultValue={value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}>
                            <option selected value={value === undefined || value === null ? null : Array.isArray(value) ? value[0] : value}>
                                {value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}
                            </option>
                            {states?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                        </select>
                        :
                        <input key={key} type={typeof value} name={key} value={value} onChange={handleInput} placeholder={key} ></input>
                    }
                    <label htmlFor={key}>{key}</label>
                </span>
            })}
            <button onClick={() => create('city', state)}>Create</button>
            <button onClick={() => update('city', state)}>Update</button>
            {/* <button onClick={() => remove('city', state?.id)}>Delete</button> */}
            <button onClick={closeModal}>Close</button>
        </dialog>
    )
}

export default forwardRef(Modal)