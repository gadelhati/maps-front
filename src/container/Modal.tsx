import { forwardRef, Ref, useEffect, useImperativeHandle } from 'react'
import { useInput } from '../assets/hook/useInput'
import './modal.css'
import { initialRole, Role } from '../component/role'

export interface ModalData {
    showModal: ()=>void
    closeModal: ()=>void
}

interface Data<T> {
    object: T,
    ref: ModalData
}

const Modal = <T extends Object>(data: Data<T>, ref: Ref<ModalData>) => {
    const { state, setState, handleInput } = useInput<T>(data.object)

    useEffect(()=>{
        setState(data.object)
    }, [data.object])

    const showModal = () => {
        (document.querySelector('#dialog') as HTMLDialogElement).show()
    }
    const closeModal = () => {
        (document.querySelector('#dialog') as HTMLDialogElement).close()
    }
    useImperativeHandle(ref, ()=>({
        showModal, closeModal
    }))
    return (
        <dialog id="dialog">
            {data.object !== undefined && Object.entries(state).map(([key, value]: [string, any]) => {
                return <span key={key + 'span'} className={'inputgroup tooltip'} data-tip={[]} style={{ display: 'flex' }}>
                    <input key={key} type={typeof value} name={key} value={value} onChange={handleInput} placeholder={key} ></input>
                    <label htmlFor={key}>{key}</label>
                </span>
            })}
            <button onClick={closeModal}>Close</button>
        </dialog>
    )
}

export default forwardRef(Modal)