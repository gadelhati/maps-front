import menuIcon from "../image/menuIcon.svg";
import './svg.acess.css'

interface Icon {
    name: string,
    color?: string,
    size?: number,
}

export const Icon = ({ name, color = 'currentColor', size = 24 }: Icon) => (
    <svg className={'svg'} style={{
        fill: color || 'currentColor',
        width: size || 24,
        height: size || 24,
      }}>
        <use xlinkHref={`${menuIcon}#${name}`} />
    </svg>
)