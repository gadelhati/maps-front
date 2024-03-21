import { useState, useLayoutEffect, useTransition, startTransition } from 'react'
import { Icon } from '../../../assets/svg.access'
import { UriToScreenFormat } from '../../../assets/uri.format'
import { logout, retrieve } from '../../../service/service.crud'
import { accessList } from '../../menu/access.list'
import { vector } from '../../menu/menu'
import logo from '../../../assets/image/coffee2.png'
import { ErrorMessage } from '../../../assets/error/errorMessage'
import { initialErrorMessage } from '../../../assets/error/errorMessage.initial'
import './sidebar.css'

export const SideList = () => {
  // const [ispending, startTransition] = useTransition()
  const [collapsible, setCollapsible] = useState(true)
  const [show, setShow] = useState(true)
  const [state, setState] = useState<string>('')
  const [states, setStates] = useState<[]>([])
  const [error, setError] = useState<ErrorMessage[]>([initialErrorMessage])
  const showCollapsible = () => { setCollapsible(!collapsible) }

  const searchByCategory = async (url: string) => {
    await retrieve(url).then((data: any) => {
      // setStates(data.content)
      startTransition(() => setStates(data.content))
    }).catch(() => { networkError() })
  }
  const networkError = () => {
    setError([{ field: 'DTO', message: 'Network Error' }])
  }
  const collapse: string[][] = [
    ["weather", "bootstrap", "sixth"],
    ["weatherOffShore", "table", "sixth"],
    ["weatherOnShore", "geo-fill", "sixth"],
  ]

  // useEffect(()=> {
  //   startTransition(() => setList(accessList()))
  // },[])
  return (
    <aside>
      <nav>
        <a key={0} href={`#/`} ><Icon name={'home'} /><p>{UriToScreenFormat('home')}</p></a>
        <div className={collapsible ? 'collapse collapsible' : 'collapse collapsed'}>
            <a key={1} onClick={showCollapsible} ><span><Icon name={'geo3'} /><span>{UriToScreenFormat('historic')}</span></span><Icon name={'geo2'} /></a>
            {collapse.map((element) => {
              return <a key={element[1]} href={`#/${element[0]}`} ><span><Icon name={element[1]} /><span>{UriToScreenFormat(element[0])}</span></span></a>
            })}
        </div>
      </nav>
      <nav>
      {vector.map((element, index) => {
          return <a key={Math.random()} href={`#/${vector[index][0]}`}><Icon name={vector[index][1]} /><p>{UriToScreenFormat(vector[index][0])}</p></a>
      })}
      <a key={'logout'} href={`#/${'login'}`} onClick={logout}><Icon name={'geo-fill'} /><p>logout</p></a>
      </nav>
    </aside>
  )
}