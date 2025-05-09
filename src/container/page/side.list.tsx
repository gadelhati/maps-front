import { useState } from 'react'
import { Icon } from '../../assets/hook/useSvg'
import { UriToScreenFormat } from '../../assets/hook/useUriFormat'
import { logout } from '../../service/service.crud'
import { vector } from '../data/menu'
// import '../template/sidebar.css'

export const SideList = () => {
  const [collapsible, setCollapsible] = useState(true)
  const toggleCollapsible = () => { setCollapsible(!collapsible) }

  const collapseItens: string[][] = [
    ["weather", "bootstrap", "sixth"],
    ["weatherOffShore", "table", "sixth"],
    ["weatherOnShore", "geo-fill", "sixth"],
  ]

  return (
    <aside>
      <nav>
        <a key={0} href={`#/`} ><Icon name={'home'} size={18} /><p>{UriToScreenFormat('home')}</p></a>
        <div className={collapsible ? 'collapse collapsible' : 'collapse collapsed'}>
            <a key={1} onClick={toggleCollapsible} >
              <span><Icon name={'geo3'} size={18} /><span>{UriToScreenFormat('historic')}</span></span>
              <Icon name={'geo2'} size={18} />
            </a>
            {collapseItens.map(([route, iconName]) => {
              return (<a key={Math.random()} href={`/${route}`} >
                  <span><Icon name={iconName} size={18} /><span>{UriToScreenFormat(route)}</span></span>
                </a>)
            })}
        </div>
      </nav>
      <nav>
      {vector.map(([route, iconName]) => {
          return (<a key={Math.random()} href={`/${route}`}><Icon name={iconName} size={18} /><p>{UriToScreenFormat(route)}</p></a>)
      })}
      <a key={'logout'} href={`#/${'login'}`} onClick={logout}><Icon name={'geo-fill'} size={18} /><p>logout</p></a>
      </nav>
    </aside>
  )
}