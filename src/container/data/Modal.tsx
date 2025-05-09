import { forwardRef, Ref, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { create, remove, update } from '../../service/service.crud'
import { useRequest } from '../../assets/hook/useRequest'
import { UriToScreenFormat } from '../../assets/hook/useUriFormat'
import { GButton } from './GButton'
// import '../template/modal.css'
// import '../template/modal2.css'
import { initialSearch } from '../../component/search'
import { Identifiable } from '../../component/identifiable'

export interface ModalData {
    showModal: () => void
    closeModal: () => void
}
interface Data<T, S> {
    url: string,
    object: T,
    validator: S,
    onObjectChange?: any,
    handleInput: any,
    handleSelect: any,
    handleMultiSelect: any,
    onActionComplete?: any,
}
const Modal = <T extends Identifiable, S extends Object>(data: Data<T, S>, ref: Ref<ModalData>) => {
    const { response, request } = useRequest(data.url, initialSearch)
    const [action, setAction] = useState<string>('retrieve')
    const modalRef = useRef<HTMLDialogElement>(null);
    const confirmRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => ({
        showModal,
        closeModal
    }))
    const showModal = useCallback(() => {
        modalRef.current?.showModal()
    }, [])
    const showConfirm = useCallback(() => {
        confirmRef.current?.showModal()
    }, [])
    const closeModal = useCallback(() => {
        modalRef.current?.close()
        confirmRef.current?.close()
    }, [])
    const crud = (action: string) => {
        setAction(action)
        closeModal()
        showConfirm()
    }
    const confirmCrud = async () => {
        switch (action) {
            case 'create':
                await create(data.url, data.object);
                break;
            case 'update':
                await update(data.url, data.object);
                break;
            case 'delete':
                await remove(data.url, data.object?.id);
                break;
            default:
                break;
        }
        data.onActionComplete()
        closeModal()
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
                <select name={key} onClick={() => request(key)} onChange={Array.isArray(value) ? data.handleMultiSelect : data.handleSelect}
                value={Array.isArray(value) ? value[0]?.name || value[0]?.id : value?.name || value?.id || ''}
                key={`select-${key}-${value.id}`}
                >
                    <option value={Array.isArray(value) ? value[0]?.name || value[0]?.id : value?.name || value?.id || ''}>
                        {value === undefined || value === null ? 'Selecione...'
                        :
                        <>{Array.isArray(value) ? value[0]?.name || value[0]?.id : value?.name || value?.id}</>}
                    </option>
                    {response.content?.map(((result: any) => 
                        <option key={result.id} value={result.id}>{result.name || result.id}</option>
                    ))}
                </select>
                :
                <input type={typeof value} name={key} value={Array.isArray(value) ? [value] : value} onChange={data.handleInput} placeholder={key} pattern={Object.values(data.validator)[index]} ></input>
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
                    {Object.entries(data.object).map(renderInput)}
                </center>
                <footer>
                    <GButton onClick={() => crud('create')}>Create</GButton>
                    <GButton onClick={() => crud('update')}>Update</GButton>
                    <GButton onClick={() => crud('delete')}>Delete</GButton>
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