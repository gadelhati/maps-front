import { forwardRef, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useInput } from '../../assets/hook/useInput'
import { create, remove, update } from '../../service/service.crud'
import { useRequest } from '../../assets/hook/useRequest'
import { UriToScreenFormat } from '../../assets/uri.format'
import { GButton } from './button'
import './modal.css'
import '../template/modal2.css'
import { initialSearch } from '../../component/search'

export interface ModalData {
    showModal: () => void
    closeModal: () => void
}
interface Data<T, S> {
    object: T,
    validation: S,
    url: string,
    onStateChange?: any,
}
const Modal = <T extends Object, S extends Object>(data: Data<T, S>, ref: Ref<ModalData>) => {
    const { state, setState, handleInput, handleSelect, handleMultiSelect } = useInput<T>(data.object)
    const { states, request } = useRequest<T>(data.url, initialSearch)
    const [action, setAction] = useState<string>('retrieve')
    // const { states, pageable, retrieve } = useRequest<T>(object.url, search.value, search.page, search.size, { key: search.key, order: search.order })
    const modalRef = useRef<HTMLDialogElement>(null);
    const confirmRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (JSON.stringify(data.object) !== JSON.stringify(state)) {
            setState(data.object);
        }
    }, [data.object])
    // useEffect(() => {
    //     if (data.onStateChange) {
    //         data.onStateChange(state);
    //     }
    // }, [state, data.onStateChange])
    const showModal = useCallback(() => {
        modalRef.current?.showModal()
    }, [])
    const showConfirm = useCallback(() => {
        confirmRef.current?.showModal()
    }, [])
    const closeModal = useCallback(() => {
        modalRef.current?.close();
        confirmRef.current?.close()
    }, [])
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
            case 'delete': remove(data.url, state?.id); closeModal(); break
            default: closeModal();
        }
    }
    const shouldRenderField = (key: string) => {
        return key !== 'id' && key !== 'links';
    }
    const renderInput = ([key, value]: [string, any], index: number) => {
        if (!shouldRenderField(key)) {
            return null;
        }
        return <span key={key} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
            {typeof value === 'object' ?
                <select name={key} onClick={() => request(key)} onChange={Array.isArray(value) ? handleMultiSelect : handleSelect}
                    defaultValue={Array.isArray(value) ? value[0]?.name || value[0]?.id : value?.name || value?.id}
                // defaultValue={Array.isArray(value) ? value[0]?.id ?? '' : value?.id ?? ''}
                // defaultValue={value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}
                >
                    <option selected value={value === undefined || value === null ? null : Array.isArray(value) ? value[0] : value}>
                        {/* {value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id} */}
                        {value === undefined || value === null ? (
                            <option value="">Selecione...</option>
                        ) : (
                            <option value={Array.isArray(value) ? value[0]?.id : value?.id}>
                                {Array.isArray(value) ? value[0]?.name || value[0]?.id : value?.name || value?.id}
                            </option>
                        )}
                    </option>
                    {states?.map(((result: any) => <option key={result.id} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                </select>
                :
                <input type={typeof value} name={key} value={Array.isArray(value) ? [value] : value} onChange={handleInput} placeholder={key} pattern={Object.values(data.validation)[index]} ></input>
            }
            <label htmlFor={key}>{key}</label>
        </span>
    }
    return (
        <>
            <dialog id='selected' className="dialog" ref={modalRef}>
                <header>
                    <h2>{UriToScreenFormat(data.url)}</h2>
                    <span onClick={closeModal}>&times;</span>
                </header>
                <center>
                    {Object.entries(state).map(renderInput)}
                </center>
                <footer>
                    <GButton onClick={() => crud('create')}>Create</GButton>
                    <GButton onClick={() => crud('update')}>Update</GButton>
                    {/* <button onClick={() => crud('delete')}>Delete</button> */}
                    <GButton onClick={closeModal}>Close</GButton>
                </footer>
            </dialog>
            <dialog id='confirm' className='dialog' ref={confirmRef}>
                <header>
                    <h2>{UriToScreenFormat(action)}</h2>
                    <span onClick={closeModal}>&times;</span>
                </header>
                <footer>
                    <GButton onClick={confirmCrud}>Confirmar</GButton>
                    <GButton onClick={closeModal}>Close</GButton>
                </footer>
            </dialog>
        </>
    )
}

export default forwardRef(Modal)