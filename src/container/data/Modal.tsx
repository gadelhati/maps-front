import { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import { useInput } from '../../assets/hook/useInput'
import { create, update } from '../../service/service.crud'
import { useRequest } from '../../assets/hook/useRequest'
import './modal.css'
import { UriToScreenFormat } from '../../assets/uri.format'

export interface ModalData {
    showModal: () => void
    closeModal: () => void
}

interface Data<T> {
    object: T,
    ref: ModalData,
    url: string,
}

const Modal = <T extends Object>(data: Data<T>, ref: Ref<ModalData>) => {
    const { state, setState, handleInput, handleSelect, handleMultiSelect } = useInput<T>(data.object)
    const { states, retrieve } = useRequest<T>('url')
    const [action, setAction] = useState<string>('retrieve')
    // const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })

    useEffect(() => {
        setState(data.object)
    }, [data.object])

    const showModal = () => {
        (document.querySelector(`#selected`) as HTMLDialogElement).showModal()
    }
    const showConfirm = () => {
        (document.querySelector(`#confirm`) as HTMLDialogElement).showModal()
    }
    const closeModal = () => {
        const elements = Array.from(document.querySelectorAll(`#selected, #confirm`))
        elements.forEach((element: any)=> {
            element.close()
        })
    }
    useImperativeHandle(ref, () => ({
        showModal, closeModal
    }))
    const crud = (action: string) => {
        setAction(action)
        closeModal()
        showConfirm()
    }
    const confirmCrud = () => {
        switch (action) {
            case 'create': create(data.url, state); closeModal(); break
            case 'update': update(data.url, state); closeModal(); break
            // case 'delete': remove(data.url, state?.id); closeModal(); break
            default: closeModal();
        }
    }
    const fill = (uri: string) => {
        retrieve(uri)
    }
    return (
        <>
            <dialog id='selected' className="dialog">
                <header>
                    <h2>{UriToScreenFormat(data.url)}</h2>
                    <span onClick={closeModal}>&times;</span>
                </header>
                <center>
                    {data.object !== undefined && Object.entries(state).map(([key, value]: [string, any]) => {
                        return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                            {typeof value === 'object' ?
                                <select key={key} name={key} onClick={() => fill(key)} onChange={Array.isArray(value) ? handleMultiSelect : handleSelect}
                                    defaultValue={value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}>
                                    <option selected value={value === undefined || value === null ? null : Array.isArray(value) ? value[0] : value}>
                                        {value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}
                                    </option>
                                    {states?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                </select>
                                :
                                <input key={key} type={typeof value} name={key} value={Array.isArray(value) ? [value] : value} onChange={handleInput} placeholder={key} ></input>
                            }
                            <label htmlFor={key}>{key}</label>
                        </span>
                    })}
                </center>
                <footer>
                    <button onClick={() => crud('create')}>Create</button>
                    <button onClick={() => crud('update')}>Update</button>
                    {/* <button onClick={() => crud('delete')}>Delete</button> */}
                    <button onClick={closeModal}>Close</button>
                </footer>
            </dialog>
            <dialog id='confirm' className='dialog'>
                <header>
                    <h2>{UriToScreenFormat(action)}</h2>
                    <span onClick={closeModal}>&times;</span>
                </header>
                <footer>
                    <button onClick={confirmCrud}>Confirmar</button>
                    <button onClick={closeModal}>Close</button>
                </footer>
            </dialog>
        </>
    )
}

export default forwardRef(Modal)