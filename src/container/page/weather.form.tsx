import { useState, ChangeEvent, useEffect, useTransition } from 'react'
import { isValidToken } from '../../service/service.token'
import { ErrorMessage } from '../../assets/error/errorMessage'
import { initialErrorMessage } from '../../assets/error/errorMessage.initial'
import { create, update, remove, retrieve, removeComposite } from '../../service/service.crud'
import { AtributeSet } from './generic.atribute'
import { Atribute } from '../../component/atribute/atribute.interface'
import { Pageable } from '../../component/pageable/pageable.interface'
import { initialPageable } from '../../component/pageable/pageable'
import { ErrorBoundary } from 'react-error-boundary'
import { createToast, toastDetails } from '../template/toast/toast.message'
import { SubAtributeSet } from '../../component/atribute/subAtribute'
import { UriToScreenFormat } from '../../assets/uri.format'
// import { PDFDownloadLink } from '@react-pdf/renderer'
// import { PDFDocument } from '../../component/pdf/PDFDocument'
// import { Icon } from '../../assets/svg.access'
// import { WeatherUpload } from '../template/upload/weather.upload'
import { Button } from '../template/button/button'
import { Header } from '../template/header/header'
import { ButtonPage } from '../template/button/button.page'
import '../template/load/load.css'
import '../template/toast/toast.css'
import '../template/inputgroup/inputgroup.css'

export const WeatherForm = <T extends { id: string, name: string }>(object: any) => {
    const [state, setState] = useState<any>(object.object)
    const [composite, setComposite] = useState<any>(object.object)
    const [states, setStates] = useState<T[]>([object.object])
    const [subStates, setSubStates] = useState<Object[][]>(SubAtributeSet(state))
    const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
    const [, setAtribute] = useState<Atribute[]>(AtributeSet(object.object))
    const [page, setPage] = useState<number>(0)
    const [size, setSize] = useState<number>(5)
    const [pageable, setPageable] = useState<Pageable>(initialPageable)
    const [ispending, startTransition] = useTransition()
    const [modal, setModal] = useState<boolean>(true)
    const [confirm, setConfirm] = useState<{message: '', show: boolean, action: string}>({message: '', show: true, action: ''})
    const [key, setKey] = useState<string>('name')
    const [search, setSearch] = useState<string>('')
    const [tab, setTab] = useState<number>(0)

    useEffect(() => {
        JSON.stringify({ ispending })
        setAtribute(AtributeSet(object.object))
        retrieveItem()
        loadSubStates()
    }, [page, size])
    useEffect(() => {
        searchValue()
        setPage(0)
    }, [key, search])
    const changeTab = (index: any) => {
        setTab(index)
    }
    const searchValue = async () => {
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const searchKey = (ikey: string) => {
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
        handleModal()
    }
    const validItem = (data: any) => {
        if (data?.hasOwnProperty('id') || data?.hasOwnProperty('ii') && data?.hasOwnProperty('iii') || data?.hasOwnProperty('ddddddd') || data?.hasOwnProperty('name') && data?.hasOwnProperty('number')) {
            setConfirm({ ...confirm, show: !confirm.show })
            retrieveItem()
            createToast(toastDetails[0])
        } else {
            handleConfirm('')
            startTransition(() => setError(data))
            createToast(toastDetails[1])
        }
    }
    const networkError = () => {
        setError([{ field: 'DTO', message: 'Network Error' }])
    }
    const createItem = async () => {
        await create(object.url, state).then((data) => {
            validItem(data)
        }).catch(() => { networkError() })
    }
    const retrieveItem = async () => {
        await retrieve(object.url, page, size, key, search).then((data: any) => {
            startTransition(() => setPageable(data))
            startTransition(() => setStates(data.content))
        }).catch(() => { networkError() })
    }
    const loadSubStates = async () => {
        Object.entries(state).map(([key], index) => {
            return (
                (key === 'observer' || key === 'station') ?
                    retrieve(key).then((data: any) => {
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
        setState({ ...state, [event.target.name]: typeof value !== 'boolean' ? value.toUpperCase() : value })
    }
    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setState({ ...state, [event.target.name]: event.target.value })
    }
    const handleInputChangeSubSelect = async (event: ChangeEvent<HTMLSelectElement>) => {
        await retrieve(event.target.name, 0, size, 'id', event.target.value).then((data: any) => {
            setState({ ...state, [event.target.name]: data?.content[0] })
        }).catch(() => { networkError() })
    }
    const handlePage = (page: number) => {
        setPage(page)
    }
    const handleSize = (event: ChangeEvent<HTMLSelectElement>) => {
        setSize(Number(event.target.value))
    }
    const handleModal = () => {
        setTab(0)
        setModal(!modal)
        setError([initialErrorMessage])
    }
    const handleNext = () => {
        if (tab < 4) { changeTab(tab + 1) }
    }
    const handleConfirm = (action: string) => {
        setConfirm({ ...confirm, show: !confirm.show, action: action })
        handleModal()
    }
    const handleConfirmYes = () => {
        switch (confirm.action) {
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
    }
    // const removeTimeFromDate = (date: any) => {
    //     let aux = new Date(date)
    //     return new Date(aux.getFullYear(), aux.getMonth() + 1, aux.getDate()).toLocaleDateString('fr-CA');
    // }
    const showObject = (values: any): any => {
        return (
            Object.entries(values).map(([key, value]: any, index) => {
                if (key !== 'id' && key !== 'password' && index <= 7 && key !== 'role') {
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
    const onClickModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-div')) {
            setModal(false);
        }
    }
    const onConfirmModal = (evt: React.MouseEvent) => {
        if ((evt.target as HTMLElement).className.includes('modal-confirm')) {
            setConfirm({ ...confirm, show: false });
        }
    }
    return (
        <>
            {/* <ShineButton onMouseMove={shine} className='shiny'>Shine Button</ShineButton> */}
            {isValidToken() &&
                <>
                    <div hidden={confirm.show} className='modal' onClick={(evt) => {
                        onConfirmModal(evt)
                    }}>
                        <article>
                            <header><span onClick={() => handleConfirm('')}>&times;</span><h2>{UriToScreenFormat('Confirm')}</h2></header>
                            <footer>
                                <Button category={'danger'} function={handleConfirmYes} name={UriToScreenFormat(confirm.action)}/>
                                <Button category={'secondary'} function={() => handleConfirm('')} name='Reset'/>
                            </footer>
                        </article>
                    </div>
                    <div hidden={modal} className='modal' onClick={(evt) => {
                        onClickModal(evt)
                    }}>
                        <article>
                            <header><span onClick={handleModal}>&times;</span><h2>{UriToScreenFormat(object.url)}</h2></header>
                            <center>
                                <div className='tabs'>
                                    <button className={tab === 0 ? 'show' : 'inative'} onClick={() => changeTab(0)}>Seção 0</button>
                                    <button className={tab === 1 ? 'show' : 'inative'} onClick={() => changeTab(1)}>Seção 1</button>
                                    <button className={tab === 2 ? 'show' : 'inative'} onClick={() => changeTab(2)}>Seção 2</button>
                                    <button className={tab === 3 ? 'show' : 'inative'} onClick={() => changeTab(3)}>Seção 3</button>
                                    <button className={tab === 4 ? 'show' : 'inative'} onClick={() => changeTab(4)}>Seção 5</button>
                                </div>
                                <div className='container'>
                                    <div className={tab === 0 ? 'tab' : 'hide'}>
                                        <span data-tip={validation('observer').length !== 0 ? true : false} >
                                            <select key={'observer'} name={'observer'} onChange={handleInputChangeSubSelect}
                                                value={state.observer}>
                                                <option selected value={state.observer === undefined || state.observer === null || state.observer[0] === null ? null : state.observer}>{state.observer === undefined || state.observer === null ? null : state.observer.name !== undefined ? state.observer?.name : state.observer?.id}</option>
                                                {subStates[Object.keys(state).indexOf('observer')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label className='label' htmlFor={'observer'} >observer</label>
                                            <label htmlFor={'observer'}>{validation('observer')}</label>
                                        </span>
                                        <span data-tip={validation('station').length !== 0 ? true : false} >
                                            <select key={'station'} name={'station'} onChange={handleInputChangeSubSelect}
                                                value={state.station}>
                                                <option selected value={state.station === undefined || state.station === null || state.station[0] === null ? null : state.station}>{state.station === undefined || state.station === null ? null : state.station.name !== undefined ? state.station?.name : state.station?.id}</option>
                                                {subStates[Object.keys(state).indexOf('station')]?.map(((result: any) => <option key={Math.random()} value={result.id}>{result?.name ? result.name : result.id}</option>))}
                                            </select>
                                            <label className='label' htmlFor={'station'} >station</label>
                                            <label htmlFor={'station'}>{validation('station')}</label>
                                        </span>
                                        <span data-tip={validation('miMi').length !== 0 ? true : false} >
                                            <span>
                                                <select key={'miMi'} name={"miMi"} required onChange={handleSelectChange}
                                                    value={state.miMi} >
                                                    <option selected value={'AA'}>AA</option>
                                                    <option value={'BB'}>BB</option>
                                                </select>
                                                <label htmlFor={"miMi"} >{"miMi"}</label>
                                                <label htmlFor={"miMi"}>{validation("miMi")}</label>
                                            </span>
                                        </span>
                                        {/* <span data-tip={validation('mjMj').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"mjMj"} required value={state.mjMj} placeholder='XX' readOnly= {true} onChange={handleInputChange}/>
                                                                <label htmlFor={"mjMj"}>{"mjMj"}</label>
                                                                <label htmlFor={"mjMj"}>{validation("mjMj")}</label>
                                                                </span>
                                                            </span> */}

                                        <span data-tip={validation('ddddddd').length !== 0 ? true : false}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ddddddd"} value={state.ddddddd} onChange={handleInputChange} placeholder={'ddddddd'} />
                                            {/* <label htmlFor={"ddddddd"}>{"ddddddd"}</label> */}
                                            <label htmlFor={"ddddddd"}>{validation("ddddddd")}</label>
                                            <span>{"ddddddd"}</span>
                                        </span>

                                        <span data-tip={validation('ii').length !== 0 || validation('iii').length !== 0 ? true : false}>
                                            <input disabled={state.miMi === 'BB' ? true : false} type="text" name={"ii"} value={state.ii} onChange={handleInputChange} placeholder={'ii'} />
                                            <label htmlFor={"ii"} className={'validation'}>{validation("ii")}</label>
                                            <span>{"ii"}</span>
                                            <input disabled={state.miMi === 'BB' ? true : false} type="text" name={"iii"} value={state.iii} onChange={handleInputChange} placeholder={'iii'} />
                                            <label htmlFor={"iii"} className={'validation'}>{validation("iii")}</label>
                                            <span>{"iii"}</span>
                                        </span>

                                        {/* <span data-tip={validation('nbNbNb').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"nbNbNb"} value={state.nbNbNb} onChange={handleInputChange}/>
                                                                <label htmlFor={"nbNbNb"}>{"nbNbNb"}</label>
                                                                <label htmlFor={"nbNbNb"}>{validation("nbNbNb")}</label>
                                                                </span>
                                                            </span> */}
                                        <span data-tip={validation('yy').length !== 0 || validation('gg').length !== 0 || validation('iw').length !== 0 ? true : false}>
                                            <input type="text" name={"yy"} required value={state.yy} onChange={handleInputChange} placeholder={'yy'} />
                                            <label htmlFor={"yy"} className={'validation'}>{validation("yy")}</label>
                                            <span>{"yy"}</span>
                                            <input type="text" name={"gg"} required value={state.gg} onChange={handleInputChange} placeholder={'gg'} />
                                            <label htmlFor={"gg"} className={'validation'}>{validation("gg")}</label>
                                            <span>{"gg"}</span>
                                            <input type="text" name={"iw"} required value={state.iw} onChange={handleInputChange} placeholder={'iw'} />
                                            <label htmlFor={"iw"} className={'validation'}>{validation("iw")}</label>
                                            <span>{"iw"}</span>
                                        </span>

                                        <span data-name={'12'} data-tip={validation('laLaLa').length !== 0 ? true : false}>
                                            <input className="child label" value="99" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"laLaLa"} value={state.laLaLa} onChange={handleInputChange} placeholder={'laLaLa'} />
                                            <label htmlFor={"laLaLa"} className={'validation'}>{validation("laLaLa")}</label>
                                            <span>{"laLaLa"}</span>
                                        </span>

                                        <span data-tip={validation('qc').length !== 0 || validation('loLoLoLo').length !== 0 ? true : false}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"qc"} value={state.qc} onChange={handleInputChange} placeholder={'qc'} />
                                            <label htmlFor={"qc"} className={'validation'}>{validation("qc")}</label>
                                            <span>{"qc"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"loLoLoLo"} value={state.loLoLoLo} onChange={handleInputChange} placeholder={'loLoLoLo'} />
                                            <label htmlFor={"loLoLoLo"} className={'validation'}>{validation("loLoLoLo")}</label>
                                            <span>{"loLoLoLo"}</span>
                                        </span>
                                    </div>
                                    {/*begining of section 1*/}
                                    <div className={tab === 1 ? 'tab' : 'hide'}>
                                        <span data-tip={validation('ir').length !== 0 || validation('ix').length !== 0 || validation('h').length !== 0 || validation('vv').length !== 0 ? true : false}>
                                            <input type="text" name={"ir"} value={state.ir} onChange={handleInputChange} placeholder={'ir'} />
                                            <label htmlFor={"ir"} className={'validation'}>{validation("ir")}</label>
                                            <span>{"ir"}</span>
                                            <input type="text" name={"ix"} value={state.ix} onChange={handleInputChange} placeholder={'ix'} />
                                            <label htmlFor={"ix"} className={'validation'}>{validation("ix")}</label>
                                            <span>{"ix"}</span>
                                            <input type="text" name={"h"} value={state.h} onChange={handleInputChange} placeholder={'h'} />
                                            <label htmlFor={"h"} className={'validation'}>{validation("h")}</label>
                                            <span>{"h"}</span>
                                            <input type="text" name={"vv"} value={state.vv} onChange={handleInputChange} placeholder={'vv'} />
                                            <label htmlFor={"vv"} className={'validation'}>{validation("vv")}</label>
                                            <span>{"vv"}</span>
                                        </span>

                                        <span data-tip={validation('n').length !== 0 || validation('dd').length !== 0 || validation('ff').length !== 0 ? true : false}>
                                            <input type="text" name={"n"} value={state.n} onChange={handleInputChange} placeholder={'n'} />
                                            <label htmlFor={"n"} className={'validation'}>{validation("n")}</label>
                                            <span>{"n"}</span>
                                            <input type="text" name={"dd"} value={state.dd} onChange={handleInputChange} placeholder={'dd'} />
                                            <label htmlFor={"dd"} className={'validation'}>{validation("dd")}</label>
                                            <span>{"dd"}</span>
                                            <input type="text" name={"ff"} value={state.ff} onChange={handleInputChange} placeholder={'ff'} />
                                            <label htmlFor={"ff"} className={'validation'}>{validation("ff")}</label>
                                            <span>{"ff"}</span>
                                        </span>

                                        <span data-tip={validation('fff').length !== 0 ? true : false}>
                                            <input className="child label" value="00" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"fff"} value={state.fff} onChange={handleInputChange} placeholder={'fff'} />
                                            <label htmlFor={"fff"} className={'validation'}>{validation("fff")}</label>
                                            <span>{"fff"}</span>
                                        </span>

                                        <span data-tip={validation('sn1_1').length !== 0 || validation('ttt').length !== 0 ? true : false}>
                                            <input className="child label" value="1" tabIndex={-1} />
                                            <input type="text" name={"sn1_1"} value={state.sn1_1} onChange={handleInputChange} placeholder={'sn1_1'} />
                                            <label htmlFor={"sn1_1"} className={'validation'}>{validation("sn1_1")}</label>
                                            <span>{"sn"}</span>
                                            <input type="text" name={"ttt"} value={state.ttt} onChange={handleInputChange} placeholder={'ttt'} />
                                            <label htmlFor={"ttt"} className={'validation'}>{validation("ttt")}</label>
                                            <span>{"ttt"}</span>
                                        </span>

                                        <span data-tip={validation('sn2_1').length !== 0 || validation('tdTdTd').length !== 0 ? true : false}>
                                            <input className="child label" value="2" tabIndex={-1} />
                                            <input type="text" name={"sn2_1"} value={state.sn2_1} onChange={handleInputChange} placeholder={'sn2_1'} />
                                            <label htmlFor={"sn2_1"} className={'validation'}>{validation("sn2_1")}</label>
                                            <span>{"sn"}</span>
                                            <input type="text" name={"tdTdTd"} value={state.tdTdTd} onChange={handleInputChange} placeholder={'tdTdTd'} />
                                            <label htmlFor={"tdTdTd"} className={'validation'}>{validation("tdTdTd")}</label>
                                            <span>{"tdTdTd"}</span>
                                        </span>

                                        <span data-tip={validation('poPoPoPo').length !== 0 ? true : false} >
                                            <input className="child label" value="3" tabIndex={-1} />
                                            <input type="text" name={"poPoPoPo"} value={state.poPoPoPo} onChange={handleInputChange} placeholder={'poPoPoPo'} />
                                            <label htmlFor={"poPoPoPo"} className={'validation'}>{validation("poPoPoPo")}</label>
                                            <span>{"poPoPoPo"}</span>
                                        </span>

                                        <span data-tip={validation('pppp').length !== 0 ? true : false}>
                                            <input className="child label" value="4" tabIndex={-1} />
                                            <input type="text" name={"pppp"} value={state.pppp} onChange={handleInputChange} placeholder={'pppp'} />
                                            <label htmlFor={"pppp"} className={'validation'}>{validation("pppp")}</label>
                                            <span>{"pppp"}</span>
                                        </span>

                                        {/* <span data-tip={validation('a3').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"a3"} value={state.a3} onChange={handleInputChange}/>
                                                                <label htmlFor={"a3"}>{"a3"}</label>
                                                                <label htmlFor={"a3"}>{validation("a3")}</label>
                                                                </span>
                                                            </span> */}

                                        {/* <span data-tip={validation('hhh').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input disabled={state.miMi === 'AA'? true : false} type="text" name={"hhh"} value={state.hhh} onChange={handleInputChange}/>
                                                                <label htmlFor={"hhh"}>{"hhh"}</label>
                                                                <label htmlFor={"hhh"}>{validation("hhh")}</label>
                                                                </span>
                                                            </span> */}

                                        <span  data-tip={validation('a').length !== 0 || validation('ppp').length !== 0 ? true : false}>
                                            <input className="child label" value="5" tabIndex={-1} />
                                            <input type="text" name={"a"} value={state.a} onChange={handleInputChange} placeholder={'a'} />
                                            <label htmlFor={"a"} className={'validation'}>{validation("a")}</label>
                                            <span>{"a"}</span>
                                            <input type="text" name={"ppp"} value={state.ppp} onChange={handleInputChange} placeholder={'ppp'} />
                                            <label htmlFor={"ppp"} className={'validation'}>{validation("ppp")}</label>
                                            <span>{"ppp"}</span>
                                        </span>

                                        <span data-tip={validation('rrr').length !== 0 || validation('tr').length !== 0 ? true : false}>
                                            <input className="child label" value="6" tabIndex={-1} />
                                            <input type="text" name={"rrr"} value={state.rrr} onChange={handleInputChange} placeholder={'rrr'} />
                                            <label htmlFor={"rrr"}>{validation("rrr")}</label>
                                            <span>{"rrr"}</span>
                                            <input type="text" name={"tr"} value={state.tr} onChange={handleInputChange} placeholder={'tr'} />
                                            <label htmlFor={"tr"}>{validation("tr")}</label>
                                            <span>{"tr"}</span>
                                        </span>

                                        <span data-tip={validation('ww').length !== 0 || validation('w1w2').length !== 0 ? true : false}>
                                            <input className="child label" value="7" tabIndex={-1} />
                                            <input type="text" name={"ww"} value={state.ww} onChange={handleInputChange} placeholder={'ww'} />
                                            <label htmlFor={"ww"} className={'validation'}>{validation("ww")}</label>
                                            <span>{"ww"}</span>
                                            <input type="text" name={"w1W2"} value={state.w1W2} onChange={handleInputChange} placeholder={'w1W2'} />
                                            <label htmlFor={"w1W2"} className={'validation'}>{validation("w1W2")}</label>
                                            <span>{"w1W2"}</span>
                                        </span>

                                        {/* <span data-tip={validation('waWa').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"waWa"} value={state.waWa} onChange={handleInputChange}/>
                                                                <label htmlFor={"waWa"}>{"waWa"}</label>
                                                                <label htmlFor={"waWa"}>{validation("waWa")}</label>
                                                                </span>
                                                            </span>

                                                            <span data-tip={validation('wa1').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa1"} value={state.wa1} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa1"}>{"wa1"}</label>
                                                                <label htmlFor={"wa1"}>{validation("wa1")}</label>
                                                                </span>
                                                            </span>

                                                            <span data-tip={validation('wa2').length !== 0 ? true : false} historic={true}>
                                                                <span>
                                                                <input type="text" name={"wa2"} value={state.wa2} onChange={handleInputChange}/>
                                                                <label htmlFor={"wa2"}>{"wa2"}</label>
                                                                <label htmlFor={"wa2"}>{validation("wa2")}</label>
                                                                </span>
                                                            </span> */}

                                        <span data-tip={validation('nh').length !== 0 || validation('cl').length !== 0 || validation('cm').length !== 0 || validation('ch').length !== 0 ? true : false}>
                                            <input className="child label" value="8" tabIndex={-1} />
                                            <input type="text" name={"nh"} value={state.nh} onChange={handleInputChange} placeholder={'nh'} />
                                            <label htmlFor={"nh"}>{validation("nh")}</label>
                                            <span>{"nh"}</span>
                                            <input type="text" name={"cl"} value={state.cl} onChange={handleInputChange} placeholder={'cl'} />
                                            <label htmlFor={"cl"}>{validation("cl")}</label>
                                            <span>{"cl"}</span>
                                            <input type="text" name={"cm"} value={state.cm} onChange={handleInputChange} placeholder={'cm'} />
                                            <label htmlFor={"cm"}>{validation("cm")}</label>
                                            <span>{"cm"}</span>
                                            <input type="text" name={"ch"} value={state.ch} onChange={handleInputChange} placeholder={'ch'} />
                                            <label htmlFor={"ch"}>{validation("ch")}</label>
                                            <span>{"ch"}</span>
                                        </span>

                                        <span data-tip={validation('gggg').length !== 0 ? true : false}>
                                            <input className="child label" value="9" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"gggg"} value={state.gggg} onChange={handleInputChange} placeholder={'gggg'} />
                                            <label htmlFor={"gggg"}>{validation("gggg")}</label>
                                            <span>{"gggg"}</span>
                                        </span>
                                    </div>
                                    {/* begining of section 2 */}
                                    <div className={tab === 2 ? 'tab' : 'hide'}>
                                        <span data-tip={validation('ds').length !== 0 || validation('vs').length !== 0 ? true : false}>
                                            <input className="child label" value="222" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ds"} value={state.ds} onChange={handleInputChange} placeholder={'ds'} />
                                            <label htmlFor={"ds"}>{validation("ds")}</label>
                                            <span>{"ds"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"vs"} value={state.vs} onChange={handleInputChange} placeholder={'vs'} />
                                            <label htmlFor={"vs"}>{validation("vs")}</label>
                                            <span>{"vs"}</span>
                                        </span>

                                        <span data-tip={validation('ss').length !== 0 || validation('twTwTw').length !== 0 ? true : false}>
                                            <input className="child label" value="0" tabIndex={-1} />
                                            <input type="text" name={"ss"} value={state.ss} onChange={handleInputChange} placeholder={'ss'} />
                                            <label htmlFor={"ss"}>{validation("ss")}</label>
                                            <span>{"ss"}</span>
                                            <input type="text" name={"twTwTw"} value={state.twTwTw} onChange={handleInputChange} placeholder={'twTwTwTw'} />
                                            <label htmlFor={"twTwTw"}>{validation("twTwTw")}</label>
                                            <span>{"twTwTw"}</span>
                                        </span>

                                        <span data-tip={validation('pwaPwa').length !== 0 || validation('hwaHwa').length !== 0 ? true : false}>
                                            <input className="child label" value="1" tabIndex={-1} />
                                            <input type="text" name={"pwaPwa"} value={state.pwaPwa} onChange={handleInputChange} placeholder={'pwaPwa'} />
                                            <label htmlFor={"pwaPwa"}>{validation("pwaPwa")}</label>
                                            <span>{"pwaPwa"}</span>
                                            <input type="text" name={"hwaHwa"} value={state.hwaHwa} onChange={handleInputChange} placeholder={'hwaHwa'} />
                                            <label htmlFor={"hwaHwa"}>{validation("hwaHwa")}</label>
                                            <span>{"hwaHwa"}</span>
                                        </span>

                                        <span data-tip={validation('pwPw').length !== 0 || validation('hwHw').length !== 0 ? true : false}>
                                            <input className="child label" value="2" tabIndex={-1} />
                                            <input type="text" name={"pwPw"} value={state.pwPw} onChange={handleInputChange} placeholder={'pwPw'} />
                                            <label htmlFor={"pwPw"}>{validation("pwPw")}</label>
                                            <span>{"pwPw"}</span>
                                            <input type="text" name={"hwHw"} value={state.hwHw} onChange={handleInputChange} placeholder={'hwHw'} />
                                            <label htmlFor={"hwHw"}>{validation("hwHw")}</label>
                                            <span>{"hwHw"}</span>
                                        </span>

                                        <span data-tip={validation('dw1Dw1').length !== 0 || validation('dw2Dw2').length !== 0 ? true : false}>
                                            <input className="child label" value="3" tabIndex={-1} />
                                            <input type="text" name={"dw1Dw1"} value={state.dw1Dw1} onChange={handleInputChange} placeholder={'dw1Dw1'} />
                                            <label htmlFor={"dw1Dw1"}>{validation("dw1Dw1")}</label>
                                            <input type="text" name={"dw2Dw2"} value={state.dw2Dw2} onChange={handleInputChange} placeholder={'dw2Dw2'} />
                                            <label htmlFor={"dw2Dw2"}>{validation("dw2Dw2")}</label>
                                        </span>

                                        <span data-tip={validation('pw1Pw1').length !== 0 || validation('hw1Hw1').length !== 0 ? true : false}>
                                            <input className="child label" value="4" tabIndex={-1} />
                                            <input type="text" name={"pw1Pw1"} value={state.pw1Pw1} onChange={handleInputChange} placeholder={'pw1Pw1'} />
                                            <label htmlFor={"pw1Pw1"}>{validation("pw1Pw1")}</label>
                                            <span>{"pw1Pw1"}</span>
                                            <input type="text" name={"hw1Hw1"} value={state.hw1Hw1} onChange={handleInputChange} placeholder={'hw1hw1'} />
                                            <label htmlFor={"hw1Hw1"}>{validation("hw1Hw1")}</label>
                                            <span>{"pw1Pw1"}</span>
                                        </span>

                                        <span data-tip={validation('pw2Pw2').length !== 0 || validation('hw2Hw2').length !== 0 ? true : false}>
                                            <input className="child label" value="5" tabIndex={-1} />
                                            <input type="text" name={"pw2Pw2"} value={state.pw2Pw2} onChange={handleInputChange} placeholder={'pw2Pw2'} />
                                            <label htmlFor={"pw2Pw2"}>{validation("pw2Pw2")}</label>
                                            <span>{"pw2Pw2"}</span>
                                            <input type="text" name={"hw2Hw2"} value={state.hw2Hw2} onChange={handleInputChange} placeholder={'hw2Hw2'} />
                                            <label htmlFor={"hw2Hw2"}>{validation("hw2Hw2")}</label>
                                            <span>{"hw2Hw2"}</span>
                                        </span>

                                        <span data-tip={validation('ic_ice').length !== 0 || validation('eses').length !== 0 || validation('rs').length !== 0 ? true : false}>
                                            <input className="child label" value="6" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"is_ice"} value={state.is_ice} onChange={handleInputChange} placeholder={'is_ice'} />
                                            <label htmlFor={"is_ice"}>{validation("is_ice")}</label>
                                            <span>{"is_ice"}</span>
                                            <input type="text" name={"eses"} value={state.eses} onChange={handleInputChange} placeholder={'eses'} />
                                            <label htmlFor={"eses"}>{validation("eses")}</label>
                                            <span>{"eses"}</span>
                                            <input type="text" name={"rs"} value={state.rs} onChange={handleInputChange} placeholder={'rs'} />
                                            <label htmlFor={"rs"}>{validation("rs")}</label>
                                            <span>{"rs"}</span>
                                        </span>

                                        <span data-tip={validation('hwaHwaHwa').length !== 0 ? true : false}>
                                            <input className="child label" value="70" tabIndex={-1} />
                                            <input type="text" name={"hwaHwaHwa"} value={state.hwaHwaHwa} onChange={handleInputChange} placeholder={'hwaHwaHwa'} />
                                            <label htmlFor={"hwaHwaHwa"}>{validation("hwaHwaHwa")}</label>
                                            <span>{"hwaHwaHwa"}</span>
                                        </span>

                                        <span data-tip={validation('tbTbTb').length !== 0 || validation('sw').length !== 0 ? true : false}>
                                            <input className="child label" value="8" tabIndex={-1} />
                                            <input type="text" name={"sw"} value={state.sw} onChange={handleInputChange} placeholder={'sw'} />
                                            <label htmlFor={"sw"}>{validation("sw")}</label>
                                            <span>{"sw"}</span>
                                            <input type="text" name={"tbTbTb"} value={state.tbTbTb} onChange={handleInputChange} placeholder={'tbTbTbTb'} />
                                            <label htmlFor={"tbTbTb"}>{validation("tbTbTb")}</label>
                                            <span>{"tbTbTb"}</span>
                                        </span>

                                        <span>
                                            <input className="child label" value="ICE" tabIndex={-1} />
                                        </span>

                                        <span data-tip={validation('ci').length !== 0 || validation('si').length !== 0 || validation('bi').length !== 0 || validation('di').length !== 0 || validation('zi').length !== 0 ? true : false}>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"ci"} value={state.ci} onChange={handleInputChange} placeholder={'ci'} />
                                            <label htmlFor={"ci"}>{validation("ci")}</label>
                                            <span>{"ci"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"si"} value={state.si} onChange={handleInputChange} placeholder={'si'} />
                                            <label htmlFor={"si"}>{validation("si")}</label>
                                            <span>{"si"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"bi"} value={state.bi} onChange={handleInputChange} placeholder={'bi'} />
                                            <label htmlFor={"bi"}>{validation("bi")}</label>
                                            <span>{"bi"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"di"} value={state.di} onChange={handleInputChange} placeholder={'di'} />
                                            <label htmlFor={"di"}>{validation("di")}</label>
                                            <span>{"di"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"zi"} value={state.zi} onChange={handleInputChange} placeholder={'zi'} />
                                            <label htmlFor={"zi"}>{validation("zi")}</label>
                                            <span>{"zi"}</span>
                                        </span>

                                    </div>
                                    {/*begining of section 3*/}
                                    <div className={tab === 3 ? 'tab' : 'hide'}>
                                        <span>
                                            <input className="child label" value="333" tabIndex={-1} />
                                        </span>

                                        <span data-tip={validation('sn1_3').length !== 0 || validation('txTxTx').length !== 0 ? true : false}>
                                            <input className="child label" value="1" tabIndex={-1} />
                                            <input type="text" name={"sn1_3"} value={state.sn1_3} onChange={handleInputChange} placeholder={'sn1_3'} />
                                            <label htmlFor={"sn1_3"}>{validation("sn1_3")}</label>
                                            <span>{"sn"}</span>
                                            <input type="text" name={"txTxTx"} value={state.txTxTx} onChange={handleInputChange} placeholder={'txTxTxTx'} />
                                            <label htmlFor={"txTxTx"}>{validation("txTxTx")}</label>
                                            <span>{"txTxTx"}</span>
                                        </span>

                                        <span data-tip={validation('sn2_3').length !== 0 || validation('tnTnTn').length !== 0 ? true : false}>
                                            <input className="child label" value="2" tabIndex={-1} />
                                            <input type="text" name={"sn2_3"} value={state.sn2_3} onChange={handleInputChange} placeholder={'sn2_3'} />
                                            <label htmlFor={"sn2_3"}>{validation("sn2_3")}</label>
                                            <span>{"sn"}</span>
                                            <input type="text" name={"tnTnTn"} value={state.tnTnTn} onChange={handleInputChange} placeholder={'tnTnTn'} />
                                            <label htmlFor={"tnTnTn"}>{validation("tnTnTn")}</label>
                                            <span>{"tnTnTn"}</span>
                                        </span>

                                        <span data-tip={validation('ind89').length !== 0 || validation('p24P24P24').length !== 0 ? true : false}>
                                            <input className="child label" value="5" tabIndex={-1} />
                                            <input type="text" name={"ind89"} value={state.ind89} onChange={handleInputChange} placeholder={'ind89'} />
                                            <label htmlFor={"ind89"}>{validation("ind89")}</label>
                                            <span>{"8/9"}</span>
                                            <input type="text" name={"p24P24P24"} value={state.p24P24P24} onChange={handleInputChange} placeholder={'p24P24P24'} />
                                            <label htmlFor={"p24P24P24"}>{validation("p24P24P24")}</label>
                                            <span>{"p24P24P24"}</span>
                                        </span>
                                    </div>
                                    {/*begning of section 5*/}
                                    <div className={tab === 4 ? 'tab' : 'hide'}>
                                        <span data-tip={validation('iChw').length !== 0 || validation('iCm').length !== 0 || validation('cs').length !== 0 || validation('iCf').length !== 0 || validation('iCp').length !== 0 || validation('iCq').length !== 0 ? true : false}>
                                            <input className="child label" value="555" tabIndex={-1} />
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iChw"} value={state.iChw} onChange={handleInputChange} placeholder={'iChw'} />
                                            <label htmlFor={"iChw"}>{validation("iChw")}</label>
                                            <span>{"iChw"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCm"} value={state.iCm} onChange={handleInputChange} placeholder={'iCm'} />
                                            <label htmlFor={"iCm"}>{validation("iCm")}</label>
                                            <span>{"iCm"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"cs"} value={state.cs} onChange={handleInputChange} placeholder={'cs'} />
                                            <label htmlFor={"cs"}>{validation("cs")}</label>
                                            <span>{"cs"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCf"} value={state.iCf} onChange={handleInputChange} placeholder={'iCf'} />
                                            <label htmlFor={"iCf"}>{validation("iCf")}</label>
                                            <span>{"iCf"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCp"} value={state.iCp} onChange={handleInputChange} placeholder={'iCp'} />
                                            <label htmlFor={"iCp"}>{validation("iCp")}</label>
                                            <span>{"iCp"}</span>
                                            <input disabled={state.miMi === 'AA' ? true : false} type="text" name={"iCq"} value={state.iCq} onChange={handleInputChange} placeholder={'iCq'} />
                                            <label htmlFor={"iCq"}>{validation("iCq")}</label>
                                            <span>{"iCq"}</span>
                                        </span>
                                    </div>

                                </div>
                                <div className={'container'}>
                                    <div>{validationDTO()}</div>
                                </div>
                            </center>
                            <footer>
                                {/* {modal &&
                                    <PDFDownloadLink document={<PDFDocument object={state} />} fileName="somename.pdf">
                                        {({ loading }) => loading ? <Button disabled={true} category={'secondary'} >Wait</Button> : <Button category={'secondary'} >Download</Button>}
                                    </PDFDownloadLink>}
                                <Button category={'primary'} onClick={resetItem} type='reset' >Reset</Button> */}
                                <Button category={'primary'} function={() => handleNext()} hidden={tab === 4} name='Next'/>
                                <Button category={'primary'} function={() => handleConfirm('create')} hidden={compositeOrNot() || tab !== 4} name='Create'/>
                                <Button category={'warning'} function={() => handleConfirm('update')} hidden={!compositeOrNot()} name='Update'/>
                                <Button category={'danger'} function={() => handleConfirm('delete')} hidden={!compositeOrNot()} name='Delete'/>
                                <Button category={'secondary'} function={handleModal} name='Close'/>
                            </footer>
                        </article>
                    </div>
                    <Header title={object.url} function={newItem}/>
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
                                {Object.entries(state).map(([key]: any, index) => {
                                    if (key !== 'id' && key !== 'password' && index < 7 && key !== 'role') {
                                        return (<th key={Math.random()} onClick={() => searchKey(key)}>{key}</th>)
                                    }
                                })}
                            </tr>
                        </thead>
                        <ErrorBoundary fallback={<div> Something went wrong </div>} >
                            <tbody>
                                {states && states.map((element) => {
                                    return (
                                        <tr key={Math.random()} onClick={() => selectItem(element)}>
                                            <>{showObject(element)}</>
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