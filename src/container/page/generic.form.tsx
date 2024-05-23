import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { getPayload, isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Pageable } from '../../component/pageable/pageable.interface'
import { initialPageable } from '../../component/pageable/pageable.initial'
import { ErrorBoundary } from 'react-error-boundary'
import { createToast, toastDetails } from '../template/toast/toast.message'
import { SubAtributeSet } from '../../component/atribute/subAtribute'
import { UriToScreenFormat } from '../../assets/uri.format'
import { PDFDownloadLink } from '@react-pdf/renderer'
import { PDFDocument } from '../../component/pdf/PDFDocument'
import { Button } from '../template/button/button'
import { Header } from '../template/header/header'
import { ButtonPage } from '../template/button/button.page'
import QRCode from 'react-qr-code'
import '../template/table/table.css'
import '../template/load/load.css'
import '../template/toast/toast.css'
import '../template/inputgroup/inputgroup.css'
import '../template/modal/modal.css'

export const GenericForm = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<any>(object.object)
    const [composite, setComposite] = useState<any>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [atribute, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(false)
    const [step, setStep] = useState<string>('')
    const [key, setKey] = useState<string>(Object.keys(state)[1])
    const [search, setSearch] = useState<string>('')
    const [order, setOrder] = useState<string>('ASC')

    useEffect(() => {
        JSON.stringify({ ispending })
        setAtribute(AtributeSet(object.object))
        retrieveItem()
        loadSubStates()
    }, [page, size, order])
    useEffect(() => {
        searchValue()
        setPage(0)
    }, [key, search])
    const searchValue = async () => {
        await retrieve(object.url, page, size, key, search, order).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const searchKey = (ikey: string) => {
        toogleOrder()
        setKey(ikey)
    }
    const searchItem = async (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value)
    }
    const resetItem = () => {
        setComposite(object.object)
        loadSubStates()
        setState(object.object)
        setError([initialErrorMessage])
    }
    const selectItem = async (data: any) => {
        loadSubStates()
        setComposite(data)
        setState(data)
        setError([initialErrorMessage])
        open('um')
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('id') || data?.hasOwnProperty('code') || data?.hasOwnProperty('ii') && data?.hasOwnProperty('iii') || data?.hasOwnProperty('ddddddd') || data?.hasOwnProperty('name') && data?.hasOwnProperty('number')) {
            close('dois')
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            startTransition(() => setError(data))
            close('dois')
            open('um')
            createToast(toastDetails[1])
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const createItem = async () => {
        await create(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { 
            networkError() })
    }
    const toogleOrder = () => {
        if(order === 'ASC') setOrder('DESC')
        if(order === 'DESC') setOrder('ASC')
    }
    const retrieveItem = async () => {
        await retrieve(object.url, page, size, key, search, order).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key, value], index) => {
            return (
                !(atribute[index]?.type === 'checkbox' || atribute[index]?.type === 'date' || value === null && atribute[index].worth === 0 || value === null && atribute[index].worth === '' || atribute[index]?.type !== 'undefined' && !Array.isArray(atribute[index]?.worth)) || atribute[index]?.type === 'object' ?
                retrieve(key, 0, 1000, '', '').then((data: any) => {
                    startTransition(() => {
                        subStates[index] = data.content
                        setSubStates(subStates)
                    })
                }).catch(() => { networkError() })
                : {}
            )
        })
    }
    const updateItem = async () => {
        await update(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const deleteItem = async () => {
        if (state.id !== undefined) {
            await remove(object.url, state.id).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('dateObservation') || composite.hasOwnProperty('ii') && composite.hasOwnProperty('iii')) {
            await removeComposite(object.url, state, state?.dateObservation, state?.ddddddd, state?.ii, state?.iii).then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        } else if (composite.hasOwnProperty('name') && composite.hasOwnProperty('number')) {
            await removeComposite(object.url, state, state?.name, state?.number, '', '').then((data) => {
                validItem(data)
            }).catch(() => { networkError() })
        }
    }
    const validation = (name: string): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (name == element.field) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    const validationDTO = (): string[] => {
        let vector: string[] = []
        if (Array.isArray(error)) {
            error?.map((element: any) => { if (element.field?.startsWith("DTO")) return vector.push(element?.message + '. ') })
        }
        return vector
    }
    // const handleInputChangeFather = (object: InputInterface) => {
    //     setState({ ...state, [object.name]: object.value })
    // }
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
        if (new RegExp(event.target.pattern).test(event.target.value) || event.target.value === '') { 
            setState({...state,[event.target.name]: value})
        } 
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handleInputChangeSubSelectArray = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: [data?.content[0]] })
        }).catch(() => { networkError() })
    }
    const handlePage = (page: number) => {
        setPage(page)
    }
    const handleSize = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(event.target.value))
    }
    const handleConfirmYes = () => {
        switch (step) {
            case 'create': createItem(); break
            case 'retrieve': retrieveItem(); break
            case 'update': updateItem(); break
            case 'delete': deleteItem(); break
        }
    }
    const newItem = () => {
        setModal(!modal)
        resetItem()
        loadSubStates()
        open('um')
    }
    // const removeTimeFromDate = (date: any) => {
    //     let aux = new Date(date)
    //     return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    // }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value]: any, index) => {
                if (key !== 'id' && key !== 'code' && key !== 'password' && index < 7 && key !== 'role') {
                    return (<td key={Math.random()}>
                        {Array.isArray(value) ?
                            <>
                                {value.map((key) => {
                                    return (
                                        typeof value === 'object' ?
                                            <>{showObject(key)}</>
                                            :
                                            <>{value}</>
                                    )
                                })}
                            </> :
                            typeof value === 'object' ?
                                <>{value === null ? '' : value?.name ? value.name : value.id}</>
                                :
                                <>{typeof value === 'boolean' ? JSON.stringify(value) : value}</>
                        }
                        {value?.type === "Polygon" && value?.coordinates[0] !== undefined &&
                            value?.coordinates[0].map(()=>{
                                return (
                                <>{value?.coordinates[0][0][0].toFixed(2)} {value?.coordinates[0][0][1].toFixed(2)}</>
                                )
                            })
                        }
                        {value?.type === "Point" &&
                            value?.coordinates[0] !== undefined && <>{value?.coordinates[0].toFixed(2)} {value?.coordinates[1].toFixed(2)}</>
                        }
                    </td>)
                }
            }))
    }
    // const shine = (event: React.MouseEvent<HTMLButtonElement>):void => {
    //     const button = document.querySelector(".shiny") as HTMLInputElement | null
    //     button?.style.setProperty("--x", event.clientX - button?.getBoundingClientRect().x)
    //     button?.style.setProperty("--y", event.clientY - button?.getBoundingClientRect().y)
    // }
    const compositeOrNot = (): boolean => {
        let id: boolean = false
        if (composite.hasOwnProperty('name') && composite?.name !== '' &&
            composite.hasOwnProperty('number') && composite?.number !== 0) {
            id = true
        }
        if (composite.hasOwnProperty('ii') && composite?.ii !== '' &&
            composite.hasOwnProperty('iii') && composite?.iii !== '') {
            id = true
        }
        if (composite.hasOwnProperty('ddddddd') && composite?.ddddddd !== '') {
            id = true
        }
        if (state.hasOwnProperty('id') && state?.id !== '') {
            id = true
        }
        if (object.url.includes('istoric')) {
            id = true
        }
        return id
    }
    const open = (name: string) => {
        (document.querySelector('.' + name) as HTMLDialogElement).showModal()
    }
    const close = (name: string) => {
        (document.querySelector('.' + name) as HTMLDialogElement).close()
    }
    const confirmation = (action: string) => {
        close('um')
        setStep(action)
        open('dois')
    }
    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <dialog className='um'>
                        <div>
                            <header><h2>{UriToScreenFormat(object.url)}</h2><span onClick={() => close('um')}>&times;</span></header>
                                <center>
                                        {Object.entries(state).map(([key, value]: any, index) => {
                                            return (
                                                // <Input childToParent={handleInputChangeFather} key={Math.random()} type={atribute[index]?.type} name={key} value={value} readOnly={false} show={modal}></Input>
                                                <span className={'inputgroup tooltip'} key={key} data-tip={validation(key)} style={atribute[index]?.type === 'hidden' ? { display: 'none' } : { display: 'flex' }}>
                                                    {Array.isArray(atribute[index]?.worth) || atribute[index]?.type === 'object' || atribute[index]?.type === 'undefined' ?
                                                        <select key={key} name={key} onChange={Array.isArray(value) ? handleInputChangeSubSelectArray : handleInputChangeSubSelect}
                                                            defaultValue={value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}>
                                                            <option selected value={value === undefined || value === null ? null : Array.isArray(value) ? value[0] : value}>
                                                                {value === undefined || value === null ? null : Array.isArray(value) && value[0] !== undefined ? (value[0].hasOwnProperty('name') ? value[0]?.name : value[0]?.id) : value.name !== undefined ? value?.name : value?.id}
                                                            </option>
                                                            {subStates[index]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                                        </select>
                                                        :
                                                        <input key={key} name={key} onChange={handleInputChange} autoComplete='off' placeholder={key} type={atribute[index]?.type === "password" || atribute[index]?.type === "checkbox" ? atribute[index]?.type : typeof value}
                                                            // defaultValue={typeof value === 'boolean' ? undefined : atribute[index]?.type === 'date' ? removeTimeFromDate(value) : value}
                                                            defaultChecked={typeof value === 'boolean' ? value : undefined}
                                                            value={typeof value === 'boolean' ? undefined : value === 0 ? '' : value} />
                                                    }
                                                    <label htmlFor={key}>{key}</label>
                                                </span>
                                            )
                                        })}
                                    <span>{validationDTO()}</span>
                                </center>
                            <footer>
                                <Button category={'primary'} function={()=>confirmation('create')} hidden={compositeOrNot()} name='Create'/>
                                <Button category={'warning'} function={()=>confirmation('update')} hidden={!compositeOrNot()} name='Update'/>
                                <Button category={'danger'} function={()=>confirmation('delete')} hidden={!compositeOrNot()} name='Delete'/>
                                <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                    {({ loading })=><Button category={'secondary'} function={''} name={loading ? 'Wait': 'Download'} disabled={loading ? true : false}/>}
                                </PDFDownloadLink>
                                <Button category={'secondary'} function={()=>close('um')} name='Close'/>
                            </footer>
                        </div>
                    </dialog>
                    <dialog className='dois'>
                        <header><h2>{UriToScreenFormat('Confirm')}</h2><span onClick={() => close('dois')}>&times;</span></header>
                        <footer>
                            <Button category={'danger'} function={handleConfirmYes} name={UriToScreenFormat(step)}/>
                            <Button category='secondary' function={()=>close('dois')} name='Reset' />
                        </footer>
                    </dialog>
                    <Header title={object.url} function={newItem} />
                    {/* {ispending && <div className='load'></div>} */}
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={9}>
                                    <header>
                                        <div>
                                            <span>show</span>
                                            <select onChange={handleSize} >
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </div>
                                        <div>
                                            <span>search {key}</span>
                                            <input name={search} onChange={searchItem} placeholder={`${key}`} value={search}></input>
                                        </div>
                                    </header>
                                </th>
                            </tr>
                            <tr>
                                <th className='icon'>QR</th>
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key !== 'id' && key !== 'code' && key !== 'password' && index < 7 && key !== 'role') {
                                        if (!object.url.includes('weather') || index < 6) {
                                            return (<th key={Math.random()} onClick={() => searchKey(key)}>{key}</th>)
                                        }
                                    }
                                })}
                                <th className='icon'>Download</th>
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states && states.map((element) => {
                                    return (
                                        <tr key={Math.random()} onClick={() => selectItem(element)}>
                                            <td className='icon'><QRCode value="00020126420014br.gov.bcb.pix0120gadelha.ti@gmail.com52040000530398654040.015802BR5923MARCELO RIBEIRO GADELHA6014RIO DE JANEIRO62580520SAN2024052303431216050300017br.gov.bcb.brcode01051.0.0630463AA" /></td>
                                            <>{showObject(element)}</>
                                            <td className='icon'>📥</td>
                                        </tr>)
                                })}
                            </tbody>
                        </ErrorBoundary>
                        <tfoot>
                            <tr>
                                <th>
                                    <ButtonPage name={'<<'} function={() => handlePage(0)}/>
                                    <ButtonPage name={'<'} function={() => handlePage(page - 1)} disabled={page <= 0 ? true : false}/>
                                    <ButtonPage name={page} function={() => handlePage(page - 1)} hidden={page <= 0 ? true : false}/>
                                    <ButtonPage name={page + 1} disabled/>
                                    <ButtonPage name={page + 2} function={() => handlePage(page + 1)} hidden={page >= pageable.totalPages - 1 ? true : false}/>
                                    <ButtonPage name={'>'} function={() => handlePage(page + 1)} disabled={page >= pageable.totalPages - 2 ? true : false}/>
                                    <ButtonPage name={'>>'} function={() => handlePage(pageable.totalPages - 1)}/>
                                </th>
                            </tr>
                            <tr><th>Total amount {pageable.totalElements}</th></tr>
                        </tfoot>
                    </table>
                    <ul className="toast notifications"></ul>
                </>
            }
        </>
    )
}