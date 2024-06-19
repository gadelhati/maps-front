import { UriToScreenFormat } from '../../../assets/uri.format'
import { Icon } from '../../../assets/svg.access'
import { vector } from '../../menu/menu'
import './card.css'

export const Cards = () => {

    return (
        <div className='card'>
            {vector.map((element) => {
                return <span key={Math.random()}><a key={Math.random()} href={`#/${element[0]}`}><Icon name={element[1]} /><p>{UriToScreenFormat(element[0])}</p></a></span>
            })}
        </div>
    )
}