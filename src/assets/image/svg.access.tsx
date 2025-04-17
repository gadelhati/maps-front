import menuIcon from "../image/menuIcon.svg";
import './svg.acess.css'

interface Icon {
    name: string,
    color?: string,
    size?: number,
}

export const Icon = ({ name, color, size }: Icon) => (
    <svg className={'svg'} style={{
        fill: color,
        width: size,
        height: size,
      }}>
        <use xlinkHref={`${menuIcon}#${name}`} />
    </svg>
)