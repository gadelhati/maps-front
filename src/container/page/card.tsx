import { UriToScreenFormat } from '../../assets/hook/useUriFormat'
import { Icon } from '../../assets/hook/useSvg'
import { vector } from '../data/menu'
// import '../template/card.css'

export const Cards = () => {

    return (
        <div className='card'>
            {vector.map((element) => {
                return <span key={Math.random()}><a key={Math.random()} href={`/${element[0]}`}><Icon name={element[1]} /><p>{UriToScreenFormat(element[0])}</p></a></span>
            })}
        </div>
    )
}