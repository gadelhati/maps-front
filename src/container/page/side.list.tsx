import { useState } from 'react'
import { Icon } from '../../assets/svg.access'
import { UriToScreenFormat } from '../../assets/uri.format'
import { logout } from '../../service/service.crud'
import { vector } from '../menu/menu.wms'
import '../template/sidebar.css'

export const SideList = () => {
  const [collapsible, setCollapsible] = useState(true)
  const showCollapsible = () => { setCollapsible(!collapsible) }

  const collapse: string[][] = [
    ["weather", "bootstrap", "sixth"],
    ["weatherOffShore", "table", "sixth"],
    ["weatherOnShore", "geo-fill", "sixth"],
  ]

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
      {vector.map((element) => {
          return <a key={Math.random()} href={`#/${element[0]}`}><Icon name={element[1]} /><p>{UriToScreenFormat(element[0])}</p></a>
      })}
      <a key={'logout'} href={`#/${'login'}`} onClick={logout}><Icon name={'geo-fill'} /><p>logout</p></a>
      </nav>
    </aside>
  )
}